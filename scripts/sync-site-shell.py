from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urljoin
import json, hashlib, re
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'https://www.1laser.com/'
html = urlopen(SOURCE, timeout=30).read().decode()
soup = BeautifulSoup(html, 'html.parser')
styles = ''.join(str(n) for n in soup.head.select('style, link[rel="stylesheet"]') if n.name == 'style' or '/cdn/shop/' in n.get('href', ''))
config = '<script>window.Shopify={designMode:false,routes:{root:"https://www.1laser.com/"}};window.routes={cart_url:"https://www.1laser.com/cart",cart_add_url:"https://www.1laser.com/cart/add",cart_change_url:"https://www.1laser.com/cart/change",cart_update_url:"https://www.1laser.com/cart/update",predictive_search_url:"https://www.1laser.com/search/suggest"};window.cartStrings={error:"Please view your cart on OneLaser.",quantityError:"Please check quantity."};</script>'
assets = ['jquery.js', 'constants.js', 'pubsub.js', 'global.js', 'details-disclosure.js', 'details-modal.js', 'search-form.js']
scripts = ''.join(str(n) for n in soup.head.select('script[src]') if n['src'].split('?')[0].split('/')[-1] in assets)
resize = '''<script>
let shellHostHeight=844;addEventListener('message',e=>{if(e.origin===location.origin&&e.source===parent&&e.data?.type==='onelaser-host-size'){shellHostHeight=e.data.height;document.documentElement.style.setProperty('--viewport-height',shellHostHeight+'px');reportHeight();}});function reportHeight(){const drawer=document.querySelector('#Details-menu-drawer-container');if(drawer?.open)drawer.classList.add('menu-opening');let height=Math.ceil(drawer?.open?shellHostHeight:document.body.dataset.part==='header'?[...document.querySelectorAll('.shopify-section-group-header-group')].reduce((n,e)=>n+e.getBoundingClientRect().height,0):Math.max(document.body.scrollHeight,document.body.getBoundingClientRect().height));if(document.body.dataset.part==='header'&&!drawer?.open){document.querySelectorAll('.header__inline-menu details[open] > div').forEach(e=>{height=Math.max(height,Math.ceil(e.getBoundingClientRect().bottom));});if(document.querySelector('details-modal details[open]'))height=shellHostHeight;}parent.postMessage({type:'onelaser-shell-size',part:document.body.dataset.part,height},location.origin);}
document.querySelectorAll('.header__inline-menu details').forEach(e=>{e.addEventListener('mouseenter',()=>{if(innerWidth>990){e.open=true;reportHeight();}});e.addEventListener('mouseleave',()=>{if(innerWidth>990){e.open=false;reportHeight();}});});new ResizeObserver(reportHeight).observe(document.body);addEventListener('load',reportHeight);addEventListener('resize',reportHeight);document.addEventListener('toggle',()=>setTimeout(reportHeight,30),true);document.addEventListener('click',()=>setTimeout(reportHeight,100));document.addEventListener('mouseover',()=>setTimeout(reportHeight,100));
document.addEventListener('click',e=>{const a=e.target.closest('a');if(a&&a.getAttribute('href')==='#'){e.preventDefault();return;}if(a&&(a.id==='backToTop'||a.hash==='#backToTop')){e.preventDefault();parent.postMessage({type:'onelaser-scroll-top'},location.origin);}});
</script>'''
CACHE = ROOT/'assets/site-shell'
CACHE.mkdir(exist_ok=True)
cache = {}
def localize(url, base=SOURCE):
    if url.startswith(('data:', '#', 'mailto:', 'tel:')):
        return url
    url = urljoin(base, url)
    if url in cache:
        return cache[url]
    ext = Path(url.split('?')[0]).suffix or '.bin'
    name = hashlib.sha256(url.encode()).hexdigest()[:20] + ext
    dest = CACHE/name
    cache[url] = '../assets/site-shell/' + name
    if not dest.exists():
        with urlopen(url, timeout=35) as response:
            data = response.read()
        if ext == '.css':
            css = data.decode()
            css = re.sub(r'url\(([^)]+)\)', lambda m: 'url("'+localize(m.group(1).strip(' \"\''),url).split('/')[-1]+'")' if not m.group(1).strip(' \"\'').startswith(('data:', '#')) else m.group(0), css)
            data = ('\n'.join(line.rstrip() for line in css.splitlines())+'\n').encode()
        dest.write_bytes(data)
    return cache[url]
for part in ['header', 'footer']:
    nodes = soup.select(f'.shopify-section-group-{part}-group')
    if not nodes:
        raise RuntimeError(f'Missing {part} section group')
    if part == 'footer':
        nodes = [n for n in nodes if n.get('id', '').endswith('__footer')]
    fragment = BeautifulSoup(''.join(str(n) for n in nodes), 'html.parser')
    for n in fragment.select('script[src]'):
        if any(x in n.get('src', '') for x in ['cart-notification.js']):
            n.decompose()
    for n in fragment.select('script[type="application/ld+json"]'):
        n.decompose()
    for n in fragment.select('a[href]'):
        href = n['href']
        if href.startswith('#'):
            n['href'] = SOURCE + href
        else:
            n['href'] = urljoin(SOURCE, href)
        n['target'] = '_top'
    for n in fragment.select('form[action]'):
        n['action'] = urljoin(SOURCE, n['action'])
        n['target'] = '_top'
    if part == 'header':
        for n in fragment.select('a[href="https://www.1laser.com/cart"]'):
            n.attrs.pop('id', None)
            n.attrs.pop('aria-haspopup', None)
    doc = BeautifulSoup('<!doctype html><html class="js" lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base target="_top">'+styles+config+scripts+'<style>html{height:auto!important;overflow:hidden}body{height:auto!important;min-height:0!important;margin:0!important;display:block!important;padding:0!important}.shopify-section-group-header-group{position:relative!important;top:auto!important}.shopify-section-group-footer-group{margin:0!important}.footer{margin-top:0!important}.scroll-trigger{opacity:1!important;transform:none!important}.header-wrapper--border-bottom{border-bottom:1px solid #e3e5e8}html,body{min-height:100vh!important}#Details-menu-drawer-container[open] #menu-drawer{transform:translateX(0)!important;visibility:visible!important}#Details-menu-drawer-container[open] .menu-drawer__inner-container{visibility:visible!important}</style></head><body class="gradient" data-part="'+part+'">'+str(fragment)+resize+'</body></html>', 'html.parser')
    for n in doc.select('[src], [href]'):
        for attr in ['src', 'href']:
            if n.has_attr(attr) and n[attr].startswith('//'):
                n[attr] = 'https:' + n[attr]
    resources = []
    for n in doc.select('link[rel="stylesheet"][href], script[src], img[src]'):
        attr = 'href' if n.name == 'link' else 'src'
        resources.append((n, attr, n[attr]))
    with ThreadPoolExecutor(max_workers=8) as pool:
        localized = list(pool.map(lambda entry: localize(entry[2]), resources))
    for (n, attr, url), value in zip(resources, localized):
        n[attr] = value
        if n.name == 'img':
            n.attrs.pop('srcset', None)
            n.attrs.pop('loading', None)
        if n.name == 'link':
            n['media'] = 'all'
    for n in doc.select('style'):
        n.string = re.sub(r'url\(([^)]+)\)', lambda m: 'url("'+localize(m.group(1).strip(' \"\''))+'")' if not m.group(1).strip(' \"\'').startswith(('data:', '#')) else m.group(0), n.get_text())
    (ROOT/'preview'/f'site-{part}.html').write_text('\n'.join(line.rstrip() for line in str(doc).splitlines())+'\n')
(ROOT/'docs/site-shell-source.json').write_text(json.dumps({'source':SOURCE,'synced_at':datetime.now(timezone.utc).isoformat(),'mode':'static preview snapshot; refresh with scripts/sync-site-shell.py','theme_integration':'page.accessories inherits the active theme layout and its header/footer groups'},indent=2)+'\n')
print('Synced official header and footer section groups.')
