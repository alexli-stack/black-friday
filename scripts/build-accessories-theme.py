from pathlib import Path
import json,re
R=Path(__file__).resolve().parents[1]
s=(R/'accessories.html').read_text()
main=s[s.index('<main>'):s.index('</main>')+7].replace('<main>','<div>',1).replace('</main>','</div>')
rest=s[s.index('<div class="compare-tray"'):s.index('</body>')]
body='<div class="ac-page">'+main+rest+'</div>'
(R/'snippets/ac-collection-body.liquid').write_text('{% doc %}\nRenders the accessories collection content without site navigation.\n{% enddoc %}\n'+body)
css='\n'.join((R/'assets'/f).read_text() for f in ['accessories.css','accessories-brand.css','accessories-typography.css'])
css=css.replace(':root',':scope')
css=re.sub(r'(?<![\w.-])body(?![\w-])',':scope',css)
css=re.sub(r'(?<![\w.-])html(?![\w-])',':scope',css)
(R/'assets/ac-theme.css').write_text('@scope (.ac-page) {\n'+css+'\n}\n')
data=(R/'assets/accessories-data.js').read_text();products=json.loads(data[len('window.ACCESSORIES = '):-2])
for p in products:p['image']=p['sourceImage']
(R/'assets/ac-theme-data.js').write_text('window.ACCESSORIES = '+json.dumps(products)+';\n')
js=(R/'assets/accessories.js').read_text().replace("'use strict';","'use strict';\nconst root=document.querySelector('.ac-page');if(!root)return;")
js=js.replace('document.querySelector(s)','root.querySelector(s)').replace('document.querySelectorAll(', 'root.querySelectorAll(').replace("document.addEventListener(","root.addEventListener(")
images=json.loads((R/'docs/accessories-machine-image-sources.json').read_text());urls=[v['source'] for v in images.values()]
js=js.replace("const machineImages=Object.fromEntries(models.map((m,i)=>[m,`assets/accessories-images/machine-${i+1}.png`]));",'const machineImages=Object.fromEntries(models.map((m,i)=>[m,'+json.dumps(urls)+'[i]]));')
(R/'assets/ac-theme.js').write_text(js)
(R/'sections/ac-collection.liquid').write_text('''{{ 'ac-theme.css' | asset_url | stylesheet_tag }}
{% render 'ac-collection-body' %}
<script src="{{ 'ac-theme-data.js' | asset_url }}" defer></script>
<script src="{{ 'ac-theme.js' | asset_url }}" defer></script>
{% schema %}
{"name":"Accessories collection","settings":[],"presets":[{"name":"Accessories collection"}]}
{% endschema %}
''')
(R/'templates/page.accessories.json').write_text(json.dumps({'sections':{'main':{'type':'ac-collection','settings':{}}},'order':['main']},indent=2)+'\n')
print('Built page.accessories with the active theme layout; no header/footer copies in the template.')
