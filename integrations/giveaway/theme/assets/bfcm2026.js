window.BFCM26Cleanup?.();

(() => {
    const cleanup = [];
    const controller = new AbortController;
    const listen = (target, type, fn, opts = {}) => {
        if (target) target.addEventListener(type, fn, typeof opts === "boolean" ? {
            capture: opts,
            signal: controller.signal
        } : {
            ...opts,
            signal: controller.signal
        });
    };
    const addEventListener = (type, fn, opts = {}) => listen(window, type, fn, opts);
    const document = window.document;
    const setInterval = (fn, ms) => {
        const id = window.setInterval(fn, ms);
        cleanup.push(() => window.clearInterval(id));
        return id;
    };
    const setTimeout = (fn, ms) => {
        const id = window.setTimeout(fn, ms);
        cleanup.push(() => window.clearTimeout(id));
        return id;
    };
    const frames = new Set;
    const requestAnimationFrame = fn => {
        const id = window.requestAnimationFrame(t => {
            frames.delete(id);
            fn(t);
        });
        frames.add(id);
        return id;
    };
    const observer = Base => class extends Base {
        constructor(...args) {
            super(...args);
            cleanup.push(() => this.disconnect());
        }
        observe(target, ...args) {
            if (target) super.observe(target, ...args);
        }
    };
    const IntersectionObserver = observer(window.IntersectionObserver), ResizeObserver = observer(window.ResizeObserver), MutationObserver = observer(window.MutationObserver);
    window.BFCM26Cleanup = () => {
        controller.abort();
        cleanup.forEach(f => f());
        frames.forEach(id => window.cancelAnimationFrame(id));
    };
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    const ASSETS = JSON.parse(document.querySelector("[data-bfcm-assets]")?.textContent || "{}");
    const localURL = u => ASSETS[u] || u;
    const CAMPAIGN = JSON.parse(document.querySelector("[data-bfcm-campaign]")?.textContent || "{}");
    const annTr = document.getElementById("annTr"), ann = document.getElementById("ann"), hd = document.getElementById("hd"), mnav = document.getElementById("mnav"), burger = document.getElementById("burger"), mega = document.getElementById("mega"), megaBd = document.getElementById("megaBd"), lastUnits = document.getElementById("lastUnits"), fx = document.getElementById("fx"), ln3 = document.getElementById("ln3"), bento = document.getElementById("bento"), pw = document.getElementById("pw"), vg = document.getElementById("vg"), ag = document.getElementById("ag"), fq = document.getElementById("fq"), fr = document.getElementById("fr"), snav = document.getElementById("snav"), vv = document.getElementById("vv"), vvb = document.getElementById("vvb"), vvc = document.getElementById("vvc");
    document.querySelectorAll(".scene").forEach(e => delete e.dataset.obs);
    const nativeHeader = document.querySelector('.section-header');
    function syncHeaderLayout() {
        if (!nativeHeader || controller.signal.aborted) return;
        const stickyTop = parseFloat(getComputedStyle(nativeHeader).top) || 0;
        document.documentElement.style.setProperty('--bfcm-activity-nav-top', `${nativeHeader.getBoundingClientRect().height + stickyTop + 12}px`);
    }
    const headerLayoutObserver = new ResizeObserver(syncHeaderLayout);
    if (nativeHeader) headerLayoutObserver.observe(nativeHeader);
    listen(document, 'shopify:section:load', syncHeaderLayout);
    syncHeaderLayout();

    const LAUNCH = new Date("2026-11-10T00:00:00-08:00"), EARLY = new Date("2026-11-09T00:00:00-08:00"), END = new Date(CAMPAIGN.end || "2026-11-30T23:59:59-08:00");
    const H07_SOLD = Number(CAMPAIGN.sold || 0);
    const ETA = {};
    const HP = location.origin + "/";
    const CDN = "https://www.1laser.com/cdn/shop/files/", S = "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/";
    const PNG = {
        xrf: "XRF_360cdcd1-c129-44be-a750-7da43a587a00.png",
        h7g2: "Hydra_7Gen2.png",
        h9g2: "Hydra_9Gen2.png",
        h13g2: "Hydra_13Gen2.png",
        h16g2: "Hydra_16Gen2.png",
        c8: "Cobra_8.png",
        c10: "Cobra_10.png",
        c14: "Cobra_14.png",
        vtg: "VertiGo_3c806291-bd5f-4153-9ca8-d54e3fd1cd0b.png",
        h9d: "d4f70b20ae08baa91175811c4f952f6f_b9af453b-621f-4432-93f1-d8e7e635b31e.png",
        h7g: "80W_d0085122-d2b3-4e5a-a510-6b0e8409eb5c.png",
        h16d: "b208d4aba7990af021c0b2224580ee1c_d8d0feaf-a45d-4019-a54c-ebb36c18496e.png"
    };
    const IMG = k => S + PNG[k] + "?width=1400";
    const FIT = {
        xrf: [ .354, "50%" ],
        h7g2: [ .251, "50%" ],
        h9g2: [ .251, "46%" ],
        h13g2: [ .271, "44%" ],
        h16g2: [ .267, "42%" ],
        c8: [ .269, "42%" ],
        c10: [ .248, "40%" ],
        c14: [ .02, "40%" ],
        vtg: [ .056, "34%" ],
        h9d: [ 0, "40%" ],
        h7g: [ .079, "42%" ],
        h16d: [ .069, "40%" ]
    };
    const CUSTOM_SCENES = {};
    CUSTOM_SCENES.xrfm = "https://cdn.shopify.com/s/files/1/0747/8748/7778/files/upload-1794100983970.jpg?v=1794100985";
    const SC = k => localURL(CUSTOM_SCENES[k] || `https://yonge6.github.io/onelaser-bfcm-2026/assets/scenes/${k}.jpg`);
    const SCENE = (k, op, alt = "", inner = "") => `<div class="scene" data-k="${k}"><img src="${localURL(SC(k))}" alt="${alt}" loading="lazy">${inner}</div>`;
    const MPOS = {
        xrf: [ .29, .44, .47 ],
        xrfm: [ .33, .47, .5 ],
        vtgs: [ .4, .43, .5 ],
        h7g2: [ .33, .49, .47 ],
        c8: [ .32, .47, .47 ],
        h7g: [ .31, .45, .47 ],
        h16d: [ .32, .45, .47 ],
        vtg: [ .23, .5, .48 ],
        c10: [ .33, .48, .47 ],
        c14: [ .33, .46, .47 ],
        h9d: [ .33, .46, .47 ],
        h9g2: [ .33, .44, .47 ],
        h13g2: [ .34, .49, .47 ],
        h16g2: [ .37, .49, .47 ],
        lineup: [ .66, .66, .55 ]
    };
    const SCN_AR = 941 / 1672;
    const NOSLACK = {
        xrfm: 1
    };
    const EDGE = {
        xrfm: "#100d0e",
        vtgs: "#644a36",
        c10: "#081935",
        c14: "#011333",
        c8: "#290c07",
        h13g2: "#081028",
        h16d: "#190806",
        h16g2: "#09122d",
        h7g: "#330c02",
        h7g2: "#170300",
        h9d: "#051943",
        h9g2: "#051335",
        vtg: "#091531",
        xrf: "#1f0600",
        lineup: "#150000"
    };
    function fitScene(sc) {
        const img = sc.querySelector("img"), m = MPOS[sc.dataset.k];
        if (!img || !m) return;
        const W = sc.clientWidth, H = sc.clientHeight;
        if (!W || !H) return;
        const mob = innerWidth < 761, [mcx, gcx, cy] = m, z = +(sc.dataset.z || 1);
        const hero = sc.parentElement.classList.contains("hero") ? sc.parentElement : null;
        let tx = .5, c = W / H < 1.3 ? mcx * .9 : gcx;
        if (sc.dataset.tx && !mob) tx = +sc.dataset.tx;
        if (hero) {
            const info = hero.querySelector(".info");
            if (info && W > 900) {
                tx = (W - info.offsetWidth - 48) / 2 / W;
                c = mcx;
            }
        }
        if(sc.dataset.k==='lineup'&&!mob){
  
  const kc=sc.closest('.kv')?.querySelector('.kv__c'),sl=sc.getBoundingClientRect().left;let tr=0,tl=W;
  kc&&[...kc.children].forEach(e=>{const r=e.getBoundingClientRect();tl=Math.min(tl,r.left-sl);if(e.classList.contains('kv__hw')||e.classList.contains('kick'))return;const rg=document.createRange();rg.selectNodeContents(e);tr=Math.max(tr,Math.min(r.right,rg.getBoundingClientRect().right)-sl)});
  const rb=W-Math.max(24,tl),rx=tr+40,GL=.377,GR=.985;
  let iw=Math.max(1,Math.min(Math.max(W,H/SCN_AR),(rb-rx)/(GR-GL),H/SCN_AR)),ih=iw*SCN_AR;
  
  const hw=kc&&kc.querySelector('.kv__hw');if(hw){const h=hw.getBoundingClientRect(),st=sc.getBoundingClientRect().top;if(rb-(GR-GL)*iw<h.right-sl){iw=Math.min(iw,(H-(h.bottom-st)-12)/(.74*SCN_AR));ih=iw*SCN_AR}}
  const left=rb-GR*iw,top=Math.min(0,H-ih)+(ih<H?H-ih:0);
  img.style.width=iw+'px';img.style.left=left+'px';img.style.top=(ih<H?H-ih:Math.min(0,.5*H-cy*ih))+'px';
  const m=`linear-gradient(90deg,transparent,#000 14%,#000 97%,transparent),linear-gradient(180deg,${ih<H?'transparent,#000 22%':'#000,#000'})`;
  img.style.webkitMaskImage=img.style.maskImage=m;img.style.webkitMaskComposite='source-in';img.style.maskComposite='intersect';
  sc.style.setProperty('--fo',`${(gcx*iw+left)/W*100}% 60%`);syncPins(sc,img,iw);return;}
        const iw = Math.max(W, H / SCN_AR) * (z * (sc.closest(".kv") || NOSLACK[sc.dataset.k] ? 1 : 1.08)), ih = iw * SCN_AR;
        const left = Math.min(0, Math.max(W - iw, tx * W - c * iw)), top = Math.min(0, Math.max(H - ih, .5 * H - cy * ih));
        img.style.width = iw + "px";
        img.style.left = left + "px";
        img.style.top = top + "px";
        img.style.webkitMaskImage = img.style.maskImage = "";
        sc.style.setProperty("--fo", `${(c * iw + left) / W * 100}% ${(cy * ih + top) / H * 100}%`);
        syncPins(sc, img, iw);
    }
    function syncPins(sc, img, iw) {
        const pn = sc.querySelector(".pins");
        if (pn) pn.style.cssText = `left:${img.style.left};top:${img.style.top};width:${iw}px;height:${iw * SCN_AR}px`;
    }
    const sro = new ResizeObserver(es => es.forEach(e => fitScene(e.target)));
    const refitHero = () => {
        if (controller.signal.aborted) return;
        const scene = document.querySelector('#top .kv__art.scene');
        if (scene) fitScene(scene);
    };
    const heroLayoutObserver = new ResizeObserver(refitHero);
    document.querySelectorAll('#top .kv__c, #top .kv__hw, #top .lead, #top .kv__trust').forEach(element => heroLayoutObserver.observe(element));
    document.fonts?.ready.then(refitHero);

    function fitAll(root = document) {
        root.querySelectorAll('[data-bfcm-product]').forEach(card => {
            const anchor = document.querySelector('[data-bfcm-block="' + card.dataset.bfcmProduct + '"]');
            const attributes = anchor?.getAttribute('data-shopify-editor-block');
            if (attributes) card.setAttribute('data-shopify-editor-block', attributes);
        });
        root.querySelectorAll("img").forEach(img => {
            if (ASSETS[img.getAttribute("src")]) img.src = ASSETS[img.getAttribute("src")];
        });
        root.querySelectorAll(".scene").forEach(sc => {
            if (!sc.dataset.obs) {
                sc.dataset.obs = 1;
                sro.observe(sc);
            }
            fitScene(sc);
        });
    }
    const P = "https://www.1laser.com/products/";
    const U = (h, v) => P + h + (v ? "?variant=" + v : "");
    const $ = n => "$" + n.toLocaleString("en-US", {
        minimumFractionDigits: 2, maximumFractionDigits: 2
    });
    const $0 = n => "$" + n.toLocaleString("en-US");
    const ini = s => s.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const ext = 'target="_blank" rel="noopener"';
    const pimg = (k, cls, extra = "", nopad) => `<img class="${cls}${nopad ? "" : " pad"}" style="--pad:${FIT[k][0]};--pw:${FIT[k][1]}${extra}" src="${IMG(k)}" alt="" loading="lazy">`;
    const RL = {
  "xrf": [
    [
      "8tn7O69iCnQ",
      "Fox News introduces OneLaser as a best holiday DIY gift",
      "OneLaser",
      0,
      61,
      "TV feature"
    ],
    [
      "RxgWwJg5kAk",
      "Behind the Maker, Ep. 1: Holly Whiteside",
      "OneLaser",
      0,
      152,
      "Maker story"
    ],
    [
      "jNaj50MkKiE",
      "I was wrong about the OneLaser X desktop laser",
      "Make or Break Shop",
      0,
      888,
      "Creator review"
    ],
    [
      "zHtW_nGm19U",
      "Pro desktop laser at a budget price: X Series review",
      "Make or Break Shop",
      1690,
      1967,
      "Creator review"
    ],
    [
      "r5m8As2oOJ4",
      "Hobby laser vs. XRF 38W RF: does speed actually matter?",
      "OneLaser",
      0,
      111,
      "Speed test"
    ],
    [
      "j0WL-yfH3wE",
      "XRF 38W RF overview: the best budget friendly desktop RF laser",
      "ESENTL LASERHYDE",
      0,
      868,
      "Creator review"
    ]
  ],
  "h07": [
    [
      "y0YUu-4rx7A",
      "Should you get an industrial size laser?",
      "Make or Break Shop",
      76,
      1618,
      "Creator review"
    ],
    [
      "HhpgAgg2ZCs",
      "My biggest regret after a year with the Hydra",
      "OneLaser",
      0,
      270,
      "Owner story"
    ],
    [
      "HdP62cQVzs0",
      "The machine behind his best selling maps",
      "OneLaser",
      0,
      321,
      "Owner story"
    ],
    [
      "Fqtlsk_NsKM",
      "Is the Hydra 13 worth it? A pottery owner's honest review",
      "OneLaser",
      0,
      251,
      "Owner story"
    ],
    [
      "mUyYcwdeC1g",
      "A year with the Hydra 9: owner review",
      "Ash&Ember Woodshop",
      0,
      96,
      "Owner review"
    ],
    [
      "vf5KO_kGgmU",
      "How we built the Fast and Furious Supra interior",
      "OneLaser",
      25,
      168,
      "Project build"
    ],
    [
      "sJx0-QZcXWo",
      "Hydra 9: the ultimate setup guide",
      "Rise N Grind Workshop",
      0,
      1324,
      "Setup guide"
    ]
  ],
  "h09d": [
    [
      "y0YUu-4rx7A",
      "Should you get an industrial size laser?",
      "Make or Break Shop",
      76,
      1618,
      "Creator review"
    ],
    [
      "HhpgAgg2ZCs",
      "My biggest regret after a year with the Hydra",
      "OneLaser",
      0,
      270,
      "Owner story"
    ],
    [
      "HdP62cQVzs0",
      "The machine behind his best selling maps",
      "OneLaser",
      0,
      321,
      "Owner story"
    ],
    [
      "Fqtlsk_NsKM",
      "Is the Hydra 13 worth it? A pottery owner's honest review",
      "OneLaser",
      0,
      251,
      "Owner story"
    ],
    [
      "mUyYcwdeC1g",
      "A year with the Hydra 9: owner review",
      "Ash&Ember Woodshop",
      0,
      96,
      "Owner review"
    ],
    [
      "vf5KO_kGgmU",
      "How we built the Fast and Furious Supra interior",
      "OneLaser",
      25,
      168,
      "Project build"
    ],
    [
      "sJx0-QZcXWo",
      "Hydra 9: the ultimate setup guide",
      "Rise N Grind Workshop",
      0,
      1324,
      "Setup guide"
    ]
  ],
  "g2p": [
    [
      "y0YUu-4rx7A",
      "Should you get an industrial size laser?",
      "Make or Break Shop",
      76,
      1618,
      "Creator review"
    ],
    [
      "HhpgAgg2ZCs",
      "My biggest regret after a year with the Hydra",
      "OneLaser",
      0,
      270,
      "Owner story"
    ],
    [
      "HdP62cQVzs0",
      "The machine behind his best selling maps",
      "OneLaser",
      0,
      321,
      "Owner story"
    ],
    [
      "Fqtlsk_NsKM",
      "Is the Hydra 13 worth it? A pottery owner's honest review",
      "OneLaser",
      0,
      251,
      "Owner story"
    ],
    [
      "mUyYcwdeC1g",
      "A year with the Hydra 9: owner review",
      "Ash&Ember Woodshop",
      0,
      96,
      "Owner review"
    ],
    [
      "vf5KO_kGgmU",
      "How we built the Fast and Furious Supra interior",
      "OneLaser",
      25,
      168,
      "Project build"
    ],
    [
      "sJx0-QZcXWo",
      "Hydra 9: the ultimate setup guide",
      "Rise N Grind Workshop",
      0,
      1324,
      "Setup guide"
    ]
  ],
  "cob": [
    [
      "F1ZJvoeANgk",
      "Meet the Cobra: official product tour",
      "OneLaser",
      0,
      226,
      "Product tour"
    ],
    [
      "fdmr7l_crhI",
      "Perfecting leatherette hat patches with Cobra 10 and XRF 38W RF",
      "ESENTL LASERHYDE",
      0,
      651,
      "Project build"
    ],
    [
      "UxN-bVOpAKg",
      "10 years evaluating lasers. Why I chose the Cobra",
      "OneLaser",
      0,
      340,
      "Owner story"
    ]
  ],
  "c08": [
    [
      "F1ZJvoeANgk",
      "Meet the Cobra: official product tour",
      "OneLaser",
      0,
      226,
      "Product tour"
    ],
    [
      "fdmr7l_crhI",
      "Perfecting leatherette hat patches with Cobra 10 and XRF 38W RF",
      "ESENTL LASERHYDE",
      0,
      651,
      "Project build"
    ],
    [
      "UxN-bVOpAKg",
      "10 years evaluating lasers. Why I chose the Cobra",
      "OneLaser",
      0,
      340,
      "Owner story"
    ]
  ],
  "vtg": [
    [
      "CwMCGw1aPTA",
      "VertiGo is the world's best tumbler machine",
      "LensDigital",
      0,
      54,
      "Creator review"
    ],
    [
      "G9fXsZAbUXs",
      "If you sell tumblers, buy this laser",
      "Make or Break Shop",
      22,
      1079,
      "Creator review"
    ]
  ],
  "co": [
    [
      "seseyuxIZt4",
      "As seen on FOX and Discovery",
      "OneLaser",
      3,
      357,
      "",
      "A product showcase of the OneLaser lineup."
    ],
    [
      "_dv0xXmHSiA",
      "Engineered in the USA",
      "OneLaser",
      0,
      68,
      "",
      "What makes OneLaser different."
    ],
    [
      "KAtO7_wkmMk",
      "OneLaser at the APA Show",
      "OneLaser",
      353,
      562,
      "",
      "International Personalization Expo 2025 recap."
    ],
    [
      "waBw5gDMPIM",
      "Makers test the new machines",
      "OneLaser",
      0,
      62,
      "",
      "Hands on at the Next Level Maker Conference."
    ]
  ]
};
    const STORIES = [ [ "WD5has9K3IY", "A six figure laser business", "How a firefighter built a business with OneLaser." ], [ "HdP62cQVzs0", "Best selling maps on Hydra 16", "The machine behind his best selling maps." ], [ "Fqtlsk_NsKM", "A pottery owner's review", "Is the Hydra 13 worth it?" ], [ "G9fXsZAbUXs", "If you sell tumblers, buy this laser", "Make or Break Shop on VertiGo." ] ];
    const SUPER = [
    {
        "id": "xrf",
        "tier": "super",
        "th": "red",
        "img": "xrf",
        "rl": "xrf",
        "name": "XRF 38W RF desktop laser engraver and cutter",
        "tag": [
            "gift",
            "Free Air Assist Control"
        ],
        "lb": [
            "True 3G acceleration",
            "1,200 mm/s",
            "38W RF tube",
            "RF: 4× precision vs glass"
        ],
        "speed": 1,
        "def": 1,
        "stock": "xrf",
        "up": {
            "id": "43674371391522",
            "n": "Auto Conveyor Feeder",
            "p": 999,
            "u": "https://www.1laser.com/products/onelaser-automatic-conveyor-feeder"
        },
        "v": [
            {
                "l": "Starter Bundle · XRF + Air Assist Control",
                "mn": "XRF 38W RF",
                "p": 4499,
                "m": 5499,
                "f": 0,
                "site": 399,
                "vid": "43557890261026",
                "u": "https://www.1laser.com/products/onelaser-xrf-desktop-laser-machine?variant=43557890261026",
                "gifts": [
                    {
                        "n": "Air Assist Control",
                        "val": 299.99,
                        "img": "lQDPJxo8d4MrtenND4zNE4iwYCxEbs-yL6sITkLfo74fAA_5000_3980.jpg"
                    }
                ]
            },
            {
                "l": "Maker Bundle · + riser base + 2 material packs",
                "mn": "XRF 38W RF",
                "img": "xrfm",
                "shown": "Shown with Riser Base + Auto Conveyor Feeder",
                "p": 4999,
                "m": 5499,
                "f": 0,
                "site": 399,
                "vid": "43972592730146",
                "u": "https://www.1laser.com/products/onelaser-xrf-desktop-laser-machine?variant=43972592730146",
                "gifts": [
                    {
                        "n": "Air Assist Control",
                        "val": 299.99,
                        "img": "lQDPJxo8d4MrtenND4zNE4iwYCxEbs-yL6sITkLfo74fAA_5000_3980.jpg"
                    },
                    {
                        "n": "Riser Base",
                        "val": 599,
                        "img": "839d9e84510a0900681b9fc541852466.png"
                    },
                    {
                        "n": "2 material packs",
                        "sub": "Acrylic + leather"
                    }
                ]
            }
        ]
    },
    {
        "id": "h07",
        "tier": "super",
        "th": "red",
        "img": "h7g2",
        "rl": "h07",
        "name": "Hydra 7 Pro 70W RF production laser",
        "tag": [
            "fire",
            "Limited offer at $7,999"
        ],
        "lb": [
            "70W RF tube",
            "2,000 mm/s",
            "4G acceleration",
            "RF: 4× precision vs glass",
            "3–4× speed vs other RF",
            "10× stability"
        ],
        "speed": 3,
        "stage": 1,
        "stock": "h07",
        "v": [
            {
                "l": "Hydra 7 Pro · 70W RF",
                "mn": "Hydra 7 Pro",
                "p": 7999,
                "p2": 8999,
                "m": 10999,
                "f": 499,
                "vid": "44667131822114",
                "u": "https://www.1laser.com/products/hydra-7-gen-2-70w-rf-co2-dual-laser-machine"
            }
        ]
    },
    {
        "id": "cob",
        "tier": "deal",
        "th": "blue",
        "img": "c8",
        "rl": "cob",
        "name": "Cobra 8, 10 and 14 CO₂ workshop lasers",
        "tag": [
            "tag",
            "Save $2,000 on every size"
        ],
        "lb": [
            "90W to 130W glass",
            "300+ materials",
            "Autofocus"
        ],
        "sizes": 1,
        "speed": 2,
        "v": [
            {
                "l": "Cobra 8 · 90W · 31.5\" × 19.7\" bed",
                "mn": "Cobra 8 90W",
                "tier": "deal",
                "th": "blue",
                "img": "c8",
                "lb": [
                    "90W glass tube",
                    "31.5\" × 19.7\" bed",
                    "300+ materials",
                    "2× faster vs avg CO₂ glass"
                ],
                "sz": {
                    "w": 800,
                    "h": 500,
                    "bed": "31.5\" × 19.7\"",
                    "mm": "800 × 500 mm",
                    "z": "5.9\" (150 mm)",
                    "m": "58\" × 41\" × 26\"",
                    "wt": "397 lb (180 kg)"
                },
                "p": 3999,
                "m": 5999,
                "f": 499,
                "vid": "44779582849058",
                "u": "https://www.1laser.com/products/cobra-8-90w-co2-laser-engraver-cutter",
                "stock": "c08"
            },
            {
                "l": "Cobra 10 · 100W · 39.4\" × 23.6\" bed",
                "mn": "Cobra 10 100W",
                "tier": "deal",
                "th": "blue",
                "img": "c10",
                "lb": [
                    "100W glass tube",
                    "39.4\" × 23.6\" bed",
                    "11\" Z travel",
                    "2× faster vs avg CO₂ glass"
                ],
                "sz": {
                    "w": 1000,
                    "h": 600,
                    "bed": "39.4\" × 23.6\"",
                    "mm": "1000 × 600 mm",
                    "z": "11\" (280 mm)",
                    "m": "66\" × 43\" × 37\"",
                    "wt": "595 lb (270 kg)"
                },
                "p": 4999,
                "m": 6999,
                "f": 699,
                "vid": "45095798046754",
                "u": "https://www.1laser.com/products/cobra-10-100w-co2-laser-engraver-cutter",
                "stock": "c10"
            },
            {
                "l": "Cobra 14 · 130W · 55.1\" × 35.4\" bed",
                "mn": "Cobra 14 130W",
                "tier": "deal",
                "th": "blue",
                "img": "c14",
                "lb": [
                    "130W glass tube",
                    "55.1\" × 35.4\" bed",
                    "11\" Z travel",
                    "2× faster vs avg CO₂ glass"
                ],
                "sz": {
                    "w": 1400,
                    "h": 900,
                    "bed": "55.1\" × 35.4\"",
                    "mm": "1400 × 900 mm",
                    "z": "11\" (280 mm)",
                    "m": "76\" × 54\" × 37\"",
                    "wt": "772 lb (350 kg)"
                },
                "p": 6999,
                "m": 8999,
                "f": 699,
                "vid": "45095798341666",
                "u": "https://www.1laser.com/products/cobra-14-130w-co2-laser-engraver-cutter",
                "stock": "c14"
            }
        ]
    }
];
    const DEALS = [
    {
        "id": "vtg",
        "tier": "deal",
        "th": "blue",
        "img": "vtgs",
        "rl": "vtg",
        "name": "VertiGo 38W RF vertical laser for drinkware",
        "tag": [
            "coffee",
            "Built for tumblers and bottles"
        ],
        "lb": [
            "Cylindrical engraving",
            "38W RF tube",
            "Smart autofocus",
            "RF: 4× precision vs glass"
        ],
        "stock": "vtg",
        "v": [
            {
                "l": "VertiGo · 38W RF",
                "mn": "VertiGo 38W RF",
                "p": 4999,
                "m": 5999,
                "f": 0,
                "site": 399,
                "vid": "44483820224546",
                "u": "https://www.1laser.com/products/vertigo-vertical-laser-engraver"
            }
        ]
    },
    {
        "id": "h09d",
        "tier": "super",
        "th": "red",
        "img": "h9d",
        "rl": "h09d",
        "name": "Hydra 9 Dual 100W glass + 38W RF laser",
        "tag": [
            "fire",
            "Lowest price ever"
        ],
        "lb": [
            "100W glass cutting",
            "38W RF engraving",
            "Dual tube",
            "RF: 4× precision vs glass",
            "3–4× speed vs other RF",
            "10× stability"
        ],
        "stock": "h09d",
        "v": [
            {
                "l": "Hydra 9 Dual · 100W + 38W RF",
                "mn": "Hydra 9 Dual",
                "p": 8999,
                "m": 10999,
                "f": 499,
                "site": 599,
                "vid": "43784477573154",
                "u": "https://www.1laser.com/products/onelaser-hydra-9-laser-engraving-machine"
            }
        ]
    },
    {
        "id": "g2p",
        "tier": "deal",
        "th": "blue",
        "img": "h9g2",
        "rl": "g2p",
        "name": "Hydra Gen2 Pro 70W RF industrial laser",
        "tag": [
            "tag",
            "Save $2,000"
        ],
        "speed": 3,
        "lb": [
            "70W RF tube",
            "2,000 mm/s",
            "4G acceleration",
            "RF: 4× precision vs glass",
            "3–4× speed vs other RF",
            "10× stability"
        ],
        "v": [
            {
                "l": "Hydra 9 Pro",
                "mn": "Hydra 9 Pro",
                "p": 9999,
                "m": 11999,
                "f": 499,
                "site": 599,
                "vid": "44745765617698",
                "u": "https://www.1laser.com/products/hydra-9-gen-2-70w-rf-co2-dual-laser-machine?variant=44745765617698",
                "img": "h9g2",
                "stock": "h09p"
            },
            {
                "l": "Hydra 13 Pro",
                "mn": "Hydra 13 Pro",
                "p": 11999,
                "m": 13999,
                "f": 599,
                "site": 699,
                "vid": "44745769123874",
                "u": "https://www.1laser.com/products/hydra-13-gen-2-70w-rf-co2-dual-laser-machine?variant=44745769123874",
                "img": "h13g2",
                "stock": "h13p"
            },
            {
                "l": "Hydra 16 Pro",
                "mn": "Hydra 16 Pro",
                "p": 12999,
                "m": 14999,
                "f": 699,
                "vid": "44745771122722",
                "u": "https://www.1laser.com/products/hydra-16-gen-2-70w-rf-co2-dual-laser-machine?variant=44745771122722",
                "img": "h16g2",
                "stock": "h16p"
            }
        ]
    }
];
    const LAST = [ {
        n: "Hydra 7 80W glass tube laser",
        mn: "Hydra 7 80W",
        img: "h7g",
        p: 5999,
        m: 7999,
        f: 499,
        vid: "43519835439138",
        u: U("onelaser-hydra-7-cabinet-dual-laser-system-with-80-glass-tube-and-38w-rf-metal-tube"),
        stock: "h07g"
    }, {
        n: "Hydra 16 Dual 150W glass + 38W RF laser",
        mn: "Hydra 16 Dual",
        img: "h16d",
        p: 11999,
        m: 13999,
        f: 699,
        vid: "43551549587490",
        u: U("onelaser-hydra-16-cabinet-dual-laser-system-with150w-glass-tube-and-38w-rf-metal-tube"),
        stock: "h16d"
    } ];
    const FEAT = {
    "name": "Hydra Gen2 Hybrid CO₂ glass + RF industrial laser",
    "desc": "Glass tube cutting and 38W RF fine engraving in one production machine, for batch work across wood, acrylic, leather, glass and coated metal.",
    "lb": [
        "Up to 150W glass",
        "38W RF",
        "2,000 mm/s",
        "RF: 4× precision vs glass",
        "3–4× speed vs other RF",
        "10× stability"
    ],
    "v": [
        {
            "l": "Hydra 9 Hybrid · 100W + 38W RF",
            "mn": "Hydra 9 Hybrid",
            "p": 10999,
            "f": 599,
            "img": "h9g2",
            "stock": "hy09",
            "vid": "44745765650466",
            "u": "https://www.1laser.com/products/hydra-9-gen-2-70w-rf-co2-dual-laser-machine?variant=44745765650466"
        },
        {
            "l": "Hydra 13 Hybrid · 130W + 38W RF",
            "mn": "Hydra 13 Hybrid",
            "p": 12999,
            "f": 699,
            "img": "h13g2",
            "stock": "hy13",
            "vid": "44745769156642",
            "u": "https://www.1laser.com/products/hydra-13-gen-2-70w-rf-co2-dual-laser-machine?variant=44745769156642"
        },
        {
            "l": "Hydra 16 Hybrid · 150W + 38W RF",
            "mn": "Hydra 16 Hybrid",
            "p": 13999,
            "f": 699,
            "img": "h16g2",
            "stock": "hy16",
            "vid": "44745771155490",
            "u": "https://www.1laser.com/products/hydra-16-gen-2-70w-rf-co2-dual-laser-machine?variant=44745771155490"
        }
    ]
};
    const BENTO = [
    [
        "big",
        "super",
        3000,
        "Hydra 7 Pro",
        "Limited qty",
        "h7g2",
        "#p-h07",
        "Hydra 7 Pro"
    ],
    [
        "big",
        "super",
        2000,
        "Hydra 9 Dual",
        "Glass + RF",
        "h9d",
        "#p-h09d",
        "Hydra 9 Dual"
    ],
    [
        "big",
        "super",
        1000,
        "XRF 38W RF",
        "True 3G · 1,200 mm/s",
        "xrfm",
        "#p-xrf",
        "XRF 38W RF",
        1
    ],
    [
        "sm",
        "deal",
        2000,
        "Hydra Gen2 Pro",
        "9, 13 and 16",
        "h9g2",
        "#p-g2p",
        "Hydra 9 Pro"
    ],
    [
        "sm",
        "deal",
        2000,
        "Cobra 8 · 10 · 14",
        "From $3,999",
        "c8",
        "#p-cob",
        "Cobra 8 90W"
    ],
    [
        "sm",
        "deal",
        1000,
        "VertiGo",
        "Drinkware laser",
        "vtgs",
        "#p-vtg",
        "VertiGo 38W RF",
        1
    ]
];
    const mediaUI = JSON.parse(document.getElementById('bfcm26-media-copy')?.textContent || '{}');
    const vt = value => `${Math.floor((Number(value) || 0) / 60)}:${String((Number(value) || 0) % 60).padStart(2, '0')}`;
    const vthumb = (x, quality) => `<img src="${escapeCopy(x[8] || (x[0] === "8tn7O69iCnQ" ? mediaUI.foxCover : `https://i.ytimg.com/vi/${x[0]}/${quality}.jpg`))}" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${x[0]}/hqdefault.jpg'" alt="" loading="lazy"><span class="pl"><i class="ph-fill ph-play"></i></span>${x[4] > 0 ? `<span class="vdur">${vt(x[4])}</span>` : ''}`;
    const vch = x => `<div class="us caption-4">${mediaUI.avatars?.[x[2]] ? `<img src="${mediaUI.avatars[x[2]]}" width="24" height="24" alt="" loading="lazy">` : `<i>${ini(x[2] || '')}</i>`}<span>${escapeCopy(x[2] || '')}</span></div>`;
    const vcard = (set, x, k, cls) => `<div class="reel ${cls}" data-set="${set}" data-k="${k}" role="button" tabindex="0" aria-label="${escapeCopy(mediaUI.playVideo)}: ${escapeCopy(x[1])} (${vt(x[4])})"><div class="thumb">${vthumb(x, cls === 'row' ? 'mqdefault' : 'maxresdefault')}</div><div class="cp">${x[5] ? `<span class="vtag">${escapeCopy(x[5])}</span>` : ''}<p class="vttl">${escapeCopy(x[1])}</p>${vch(x)}</div></div>`;

    function vreels(set,r){const n=r.length;if(!n)return'';const rest=c=>r.slice(1).map((x,i)=>vcard(set,x,i+1,c)).join('');
 const body=n<3?r.map((x,k)=>vcard(set,x,k,'big')).join(''):n===3?vcard(set,r[0],0,'big')+`<div class="vst">${rest('')}</div>`:vcard(set,r[0],0,'big')+`<div class="vls"><div class="vls__h"><b>${escapeCopy(mediaUI.upNext)}</b><span>${n-1} ${escapeCopy(mediaUI.moreVideos)}</span></div><div class="vls__s" tabindex="-1">${rest('row')}</div></div>`;
 return `<div class="reels"><div class="rhead"><span class="rhead__t"><span class="caption-3 gold">${escapeCopy(mediaUI.reviews)}</span><span class="heading-5">${escapeCopy(mediaUI.review_heading)} ${escapeCopy(({xrf:"XRF 38W RF",h07:"Hydra",h09d:"Hydra",g2p:"Hydra",cob:"Cobra",vtg:"VertiGo"})[set] || "OneLaser")}</span></span><button class="rentry" data-set="${set}" data-k="0"><i class="ph-fill ph-play"></i>${escapeCopy(mediaUI.watchAll)} ${n}</button></div><div class="vf ${n<3?'n2':n===3?'n3':'nx'}">${body}</div></div>`}
    const makerVariant = SUPER.find(p => p.id === 'xrf')?.v.find(v => v.vid === '43972592730146');
    if (makerVariant) makerVariant.gifts = [makerVariant.gifts[0], makerVariant.gifts[1],
        {n: mediaUI.leatherPack, sub: mediaUI.leatherSpecs, img: '1_f1669e61-793f-4441-977e-3efacfb5eacb.webp'},
        {n: mediaUI.acrylicPack, sub: mediaUI.acrylicSpecs, img: '32_ca0658c8-9a39-49be-a5a7-6f8f345a1d07.webp'}];

    const PROJ = [ [ "product-walnut-serving-board", "Personalized serving board", "XRF 38W RF" ], [ "product-rocks-glass", "Whiskey glass set", "XRF 38W RF" ], [ "home-project-etsy-whiskey-decanter-gift-set", "Whiskey decanter gift set", "XRF 38W RF" ], [ "home-project-etsy-holiday-ornament-collection", "Holiday ornament collection", "XRF 38W RF" ], [ "home-project-vertigo-event-tumbler-batch", "Event tumbler batch", "VertiGo" ], [ "home-project-etsy-realtor-closing-gift-set", "Closing gift set", "XRF 38W RF" ], [ "home-project-walnut-mountain-wall", "Mountain feature wall", "Hydra" ], [ "product-custom-tumbler", "Custom tumbler", "VertiGo" ], [ "home-project-batch-leather-gifts", "Batch leather gift set", "XRF 38W RF" ], [ "home-project-large-acrylic-sign", "Layered acrylic wall sign", "Cobra" ], [ "product-leather-patch-cap", "Leather patch cap", "XRF 38W RF" ], [ "home-project-layered-city-map", "Layered city map", "Hydra" ] ];
    const ACC = {
        acc: [ [ "OneLaser Air Assist Control, Dual Mode Airflow", 299.99, "lQDPJxo8d4MrtenND4zNE4iwYCxEbs-yL6sITkLfo74fAA_5000_3980.jpg", "air-assist-for-laser-engraver-cutter" ], [ "Automatic Conveyor Feeder for OneLaser XRF", 999, "9beab4683ad286661f4bb3a0568b2f8a.png", "onelaser-automatic-conveyor-feeder" ], [ "OneLaser X Series Riser Base", 599, "839d9e84510a0900681b9fc541852466.png", "onelaser-x-series-riser-base" ], [ "OneLaser Chiller for Hydra and Cobra Glass Tube", 699, "CW5200_Industrial_Chiller.png", "onelaser-industrial-chiller-for-hydra-laser-engraver" ], [ "PiBurn Lite Rotary for OneLaser", 499, "PBL_main.0.png", "piburn-lite-for-onelaser" ], [ "FiltraBox Micro Compact Filtration System", 1995, "4_9de31b3c-4d90-447f-9ff5-d5901da89c46.png", "filtrabox-micro" ] ],
        mat: [ [ 'MakerDepot 1/8" Mirror Acrylic Sheets, 4 Pack', 35.99, "maker-depot-mirror-acrylic-sheets-pink-mirror-1.webp", "1-8-mirror-acrylic-sheets-12-12-4-pack-for-laser-engraving-cutting" ], [ 'MakerDepot 1/8" Glitter Acrylic Sheets, 4 Pack', 39.99, "glitter-acrylic-sheets-gold-glitter-cast-acrylic-four-pack.webp", "1-8-glitter-acrylic-sheets-12-12-4-pack-for-laser-engraving-cutting" ], [ 'MakerDepot 1/8" Frosted Matte Acrylic, 4 Pack', 35.99, "32_ca0658c8-9a39-49be-a5a7-6f8f345a1d07.webp", "1-8-frosted-matte-acrylic-sheets-12-12-4-pack-for-laser-engraving-cutting" ], [ 'MakerDepot 1/8" Translucent Acrylic Sheets, 4 Pack', 29.99, "6_18676b7d-35f3-4ed8-9c3c-e9fed69a30cd.webp", "1-8-translucent-acrylic-sheets-12-12-4-pack-for-laser-engraving-cutting" ], [ "MakerDepot 1.0mm No Foam Leatherette, 5 Pack", 59, "1_f01ba7dc-7c51-462c-b2eb-65ff724cb0e3.webp", "makerdepot-1-0mm-no-foam-leatherette-sheets-12-20-5-pack-for-laser-engraving-cutting" ], [ "MakerDepot Carbon Fiber Leatherette, 5 Pack", 64.9, "1_9b86f9fa-bdf9-4b66-87ad-892f54e34912.webp", "makerdepot-carbon-fiber-leatherette-sheets-12-20-5-pack-for-laser-engraving-cutting" ] ],
        svc: [ [ "LightBurn Pro License Key", 199, "LIGHTBURNPRO.png", "lightburn-software-pro-license-key" ], [ "OneLaser Engineer One on One Training and Support", 79.99, "e58e6b7b66d5d9bd76382ac7cc098a84.jpg", "engineer-1-on-1-training-support" ], [ "Free OneLaser Sales Consultation Call", 0, "SALES_CONSULTATION_CALL_SESSION.png", "sales-consultation-call" ] ]
    };
    const sel = {};
    const fin = `<div><i class="ph ph-credit-card"></i><span>Lease to own financing with <a href="https://www.1laser.com/pages/financing" ${ext}>Clicklease</a></span></div>`;
    const ship = v => {
        const discounted = Number.isFinite(v.site) && v.site > v.f;
        const highlighted = v.f === 0 || discounted;
        const current = v.f === 0 ? '<b>FREE SHIPPING</b>' : highlighted ? `<b>Shipping ${$(v.f)}</b>` : `Shipping ${$(v.f)}`;
        return `<div${highlighted ? ' class="fsr"' : ''}><i class="ph${highlighted ? '-fill' : ''} ph-truck"></i><span>${current}${discounted ? `<s>${$(v.site)}</s><em>${escapeCopy(mediaUI.shippingSaved)} ${$(v.site - v.f)}</em>` : ''}</span></div>`;
    };
    let pendingCartRequest = false;
    function showCartError(trigger, message) {
        const container = trigger.closest('.acts,form') || trigger.parentElement;
        let error = container.parentElement.querySelector('[data-bfcm-cart-error]');
        if (!error) {
            error = document.createElement('p');
            error.dataset.bfcmCartError = '';
            error.className = 'caption-4';
            error.setAttribute('role', 'alert');
            container.insertAdjacentElement('afterend', error);
        }
        error.textContent = message;
    }
    async function addItemsToNativeCart(trigger, suppliedItems, checkout = false) {
        if (pendingCartRequest) return;
        pendingCartRequest = true;
        const originalLabel = trigger.innerHTML;
        trigger.setAttribute('aria-busy', 'true');
        trigger.setAttribute('aria-disabled', 'true');
        trigger.textContent = 'Adding…';
        showCartError(trigger, '');
        try {
            await customElements.whenDefined('cart-drawer');
            const drawer = document.querySelector('cart-drawer');
            if (!drawer) throw new Error('The cart is unavailable. Please try again.');
            let items = suppliedItems;
            if (!items) {
                const ids = (trigger.dataset.cartItems || '').split(',').filter(Boolean);
                if (ids.length) items = ids.map(id => ({id, quantity: 1}));
                else {
                    const handle = trigger.dataset.productHandle;
                    if (!handle) throw new Error('Please select a product and try again.');
                    const productResponse = await fetch(`${window.Shopify?.routes?.root || '/'}products/${encodeURIComponent(handle)}.js`, {headers: {'Accept': 'application/json'}});
                    if (!productResponse.ok) throw new Error('This product is unavailable. Please try another item.');
                    const product = await productResponse.json();
                    const variant = product.variants.find(value => value.available);
                    if (!variant) throw new Error('This product is currently sold out.');
                    items = [{id: String(variant.id), quantity: 1}];
                }
            }
            drawer.setActiveElement(trigger);
            const sectionIds = drawer.getSectionsToRender().map(section => section.id);
            const cartRoot = window.Shopify?.routes?.root || '/';
            const response = await (window.OneLaserGiftCart?.mutate || window.fetch)(`${cartRoot}cart/add.js`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
                body: JSON.stringify({items, sections: sectionIds, sections_url: location.pathname})
            });
            const state = await response.json();
            if (!response.ok || state.status) throw new Error(typeof state.description === 'string' ? state.description : 'This item could not be added. Please check its availability.');
            if (checkout) {
                await window.OneLaserGiftCart?.sync();
                location.assign(`${cartRoot}checkout`);
                return;
            }
            if (!state.sections?.['cart-drawer']) {
                const sectionResponse = await fetch(`${location.pathname}?sections=${encodeURIComponent(sectionIds.join(','))}`, {headers: {'Accept': 'application/json'}});
                if (!sectionResponse.ok) throw new Error('Your item was added, but the cart could not refresh. Please open the cart to review it.');
                state.sections = await sectionResponse.json();
            }
            if (!state.sections?.['cart-drawer']) throw new Error('Your item was added, but the cart could not refresh. Please open the cart to review it.');
            drawer.classList.remove('is-empty');
            drawer.renderContents(state);
            if (typeof publish === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
                publish(PUB_SUB_EVENTS.cartUpdate, {source: 'bfcm2026', productVariantId: items[0].id, cartData: state});
            }
            const added = state.items || [];
            (window.dataLayer = window.dataLayer || []).push({
                event: 'add_to_cart',
                ecommerce: {currency: window.Shopify?.currency?.active || 'USD', value: added.reduce((sum, item) => sum + (item.final_line_price ?? item.line_price ?? item.price * item.quantity) / 100, 0), items: added.map(item => ({item_id: String(item.variant_id || item.id), item_name: item.product_title || item.title, price: (item.final_price ?? item.price) / 100, quantity: item.quantity}))}
            });
        } catch (error) {
            showCartError(trigger, error.message || 'We could not add this item. Please try again.');
        } finally {
            trigger.innerHTML = originalLabel;
            trigger.removeAttribute('aria-busy');
            trigger.removeAttribute('aria-disabled');
            pendingCartRequest = false;
        }
    }
    listen(document, 'click', event => {
        const trigger = event.target.closest('[data-add], [data-buy][data-cart-items]');
        if (trigger) {
            event.preventDefault();
            addItemsToNativeCart(trigger, undefined, trigger.hasAttribute('data-buy'));
        } else if (!event.defaultPrevented) {
            const cartIcon = event.target.closest('#cart-icon-bubble');
            if (cartIcon) {
                event.preventDefault();
                document.querySelector('cart-drawer')?.open(cartIcon);
            }
        }
    });
    listen(document, 'submit', event => {
        const form = event.target.closest('.bfcm-module form[action*="/cart/add"]');
        if (!form) return;
        event.preventDefault();
        const values = new FormData(form);
        const id = values.get('id');
        if (id) addItemsToNativeCart(event.submitter || form.querySelector('[type="submit"]'), [{id: String(id), quantity: Number(values.get('quantity') || 1)}]);
    });

    const SHOP = location.origin;
    const BUY = ids => `${SHOP}/cart/${ids.map(i => i + ":1").join(",")}`;
    const ADD = ids => ids.length > 1 ? `${SHOP}/cart/${ids.map(i => i + ":1").join(",")}?storefront=true` : `${SHOP}/cart/add?id=${ids[0]}&quantity=1`;
    const LIVE = () => true;
    const FSB = '<span class="fsb"><i class="ph-fill ph-truck"></i>Free shipping</span>';
    const MP = (n, s, note) => `<div class="mp${note ? " mp--note" : ""}"><b>${n}</b>${s ? `<small>${s}</small>` : ""}</div>`;
    const bundleCopy = JSON.parse(document.getElementById('onelaser-bfcm-gift-config').textContent);
    const upOn = {};
    function acts(o) {
        const sm = o.sm ? " sm" : "";
        if (!o.ids[0]) return `<a class="btn primary" href="/pages/sales-consultation">Talk to a laser expert</a>`;
        return `<div class="acts"><a class="btn primary${sm}" href="${ADD(o.ids)}" data-add="${o.n}" data-cart-items="${o.ids.join(',')}" data-val="${o.v}"><i class="ph-bold ph-shopping-cart-simple"></i>Add to cart</a><a class="btn light${sm}" href="${BUY(o.ids)}" data-buy="${o.n}" data-cart-items="${o.ids.join(',')}" data-val="${o.v}"><i class="ph-bold ph-lightning"></i>Buy now</a></div><div class="help"><a href="${o.u}" ${ext}><i class="ph ph-file-text"></i>${escapeCopy(mediaUI.full_specs)}</a><a href="https://www.1laser.com/products/sales-consultation-call#book" data-ol-booking data-product-handle="sales-consultation-call" aria-haspopup="dialog" data-book="${o.n}"><i class="ph ph-calendar-check"></i>${escapeCopy(mediaUI.book_call)}</a><button type="button" data-lead="${o.n}" data-call="1"><i class="ph ph-chat-circle-text"></i>${escapeCopy(mediaUI.leave_info)}</button></div>`;
    }
    function stockState(variant) {
        const tracked = variant.inventory_tracked === true && Number.isInteger(variant.stock_count);
        if (tracked) {
            const quantity = Math.max(0, variant.stock_count);
            if (quantity > 0) return {quantity, label: `Only ${quantity} in stock`, badge: 'In stock'};
            if (variant.available) return {quantity, label: 'Available to order · no stock currently', badge: 'Available to order'};
            return {quantity, label: 'Out of stock', badge: 'Out of stock'};
        }
        const label = variant.available === true ? 'Available to order' : variant.available === false ? 'Unavailable' : 'Check availability';
        return {quantity: null, label, badge: label};
    }
    function stockRow(variant) {
        const state = stockState(variant);
        const message = '<b>Limited stock,</b> <span class="amb">can sell out anytime</span>';
        return `<div class="ls" data-inventory-variant="${variant.vid || ''}" data-inventory-quantity="${state.quantity === null ? '' : state.quantity}" aria-live="polite"><i class="dot" aria-hidden="true"></i><span>${message}</span></div>`;
    }
    function stockBadge(variant) {
        return stockState(variant).badge;
    }
    const firstStage = v => v.stage_highlight !== 'second';
    const stagePrices = v => {
        let first = Number(v.stage_first_price ?? v.p), second = Number(v.p2 ?? 8999);
        if (v.stage_use_live === true) {
            if (firstStage(v)) first = Number(v.p);
            else second = Number(v.p);
        }
        return {first, second, active: firstStage(v) ? first : second};
    };
    const price1 = (p, v) => p.stage ? stagePrices(v).active : v.p;
    function speedPanel(key) {
        return document.querySelector(`template[data-bfcm-performance="${key}"]`)?.innerHTML || "";
    }
    function offerCopy(tier) {
        const root = document.getElementById(tier === 'super' ? 'super' : 'bfcm');
        return {label: root?.dataset.offerLabel || (tier === 'super' ? 'Super Deal' : 'BFCM Deal'), meaning: root?.dataset.offerMeaning || ''};
    }
    function sizeCmp(p, cur) {
        const X = 1400, Y = 900;
        const box = (w, h, cls, lab, ix) => `<div class="sz__r ${cls}" style="width:${w / X * 100}%;height:${h / Y * 100}%"${ix != null ? ` data-sel="${p.id}:${ix}" role="button" tabindex="0" aria-label="Show ${lab}"` : ""}><span>${lab}</span></div>`;
        return `<div class="csz"><div class="csz__h"><span class="title-2">Compare Cobra sizes</span><span class="caption-4 muted">Work areas drawn to scale. Tap a size to switch.</span></div><div class="csz__g">\n  <div class="sz"><div class="sz__in">${p.v.map((x, k) => ({
            x: x,
            k: k
        })).reverse().map(({x: x, k: k}) => box(x.sz.w, x.sz.h, k === cur ? "on" : "", `${x.mn.split(" ").slice(0, 2).join(" ")} · ${x.sz.bed}`, k)).join("")}${box(610, 305, "ref", 'XRF bed 24" × 12"', null)}</div></div>\n  <div class="szt"><table><thead><tr><th scope="col">Model</th><th scope="col">Work area</th><th scope="col">Z travel</th><th scope="col">Machine W × D × H</th><th scope="col">Weight</th><th scope="col">Black Friday</th></tr></thead><tbody>${p.v.map((x, k) => `<tr class="${k === cur ? "on" : ""}" data-sel="${p.id}:${k}" tabindex="0"><th scope="row">${x.mn}</th><td>${x.sz.bed}<small>${x.sz.mm}</small></td><td>${x.sz.z}</td><td>${x.sz.m}</td><td>${x.sz.wt}</td><td><b>${$0(x.p)}</b><s>${$0(x.m)}</s></td></tr>`).join("")}</tbody></table></div>\n </div></div>`;
    }
    function totalSavings(v, pay) {
        const lines = [[mediaUI.off_msrp, Math.max(0, v.m - pay)]];
        (v.gifts || []).forEach(g => { if (g.val) lines.push([`${mediaUI.free_value} ${g.n}`, g.val]); });
        if (String(v.vid) === '43972592730146') lines.push([`${mediaUI.free_value} ${mediaUI.material_packs_value}`, 100]);
        if (v.f === 0 && v.site) lines.push([mediaUI.free_shipping, v.site]);
        if (lines.length < 2) return '';
        const total = Math.round(lines.reduce((sum, line) => sum + line[1], 0) * 100) / 100;
        return `<div class="tsv"><div class="tsv__h"><span><i class="ph-fill ph-piggy-bank"></i>${escapeCopy(mediaUI.total_savings)}</span><b class="num">${$(total)}</b></div><ul class="tsv__l">${lines.map(line => `<li><span>${escapeCopy(line[0])}</span><b>${$(line[1])}</b></li>`).join('')}</ul><p class="tsv__f">${escapeCopy(mediaUI.worth)} <s>${$(Math.round((pay + total) * 100) / 100)}</s> ${escapeCopy(mediaUI.if_bought_separately)} ${escapeCopy(mediaUI.yours_for)} <b>${$(pay)}</b>.</p></div>`;
    }
    const variantUpsell = (p, v) => p.id === 'xrf' && String(v.vid) === '43557890261026' ? null : p.up;
    const HSZ = [ [ 7, 700, 500, '27.6" × 19.7"' ], [ 9, 900, 600, '35.4" × 23.6"' ], [ 13, 1300, 900, '51.2" × 35.4"' ], [ 16, 1600, 1e3, '63" × 39.4"' ] ];
    let zaLine = "hy", zaOn = null;
function zaRows() {
    if (zaLine === "co") {
        const c = ALLP.find(x => x.id === "cob");
        return c.v.map((x, k) => ({
            k: "c" + k,
            n: x.mn,
            w: x.sz.w,
            h: x.sz.h,
            bed: x.sz.bed,
            mm: x.sz.mm,
            z: x.sz.z,
            from: x.p,
            ms: [ [ x.mn, x.p, "#p-cob" ] ]
        }));
    }
    const all = [];
    ALLP.forEach(p => p.v.forEach(v => all.push([ v.mn, price1(p, v), "#p-" + p.id ])));
    LAST.forEach(b => all.push([ b.mn, b.p, "#lastUnits" ]));
    return HSZ.map(([n, w, h, bed]) => {
        const ms = all.filter(m => new RegExp("^Hydra " + n + "\\b").test(m[0])).sort((a, b) => a[1] - b[1]);
        return {
            k: "h" + n,
            n: "Hydra " + n,
            w: w,
            h: h,
            bed: bed,
            mm: `${w.toLocaleString("en-US")} × ${h.toLocaleString("en-US")} mm`,
            z: '8.9" (225 mm)',
            from: ms[0]?.[1],
            ms: ms
        };
    });
}
function renderZa() {
    const el = $id("szAll");
    if (!el) return;
    const R = zaRows(), X = 1600, Y = 1e3;
    const box = (r, cls, lab) => `<div class="sz__r ${cls}" style="width:${r.w / X * 100}%;height:${r.h / Y * 100}%"${r.k ? ` data-za="${r.k}" role="button" tabindex="0" aria-label="${escapeCopy(mediaUI.highlight)} ${lab}"` : ""}><span>${lab}</span></div>`;
    el.innerHTML = `<div class="csz za"><div class="csz__h"><span class="title-2">${escapeCopy(mediaUI.work_areas)}</span><div class="za__t" role="tablist" aria-label="${escapeCopy(mediaUI.laser_line)}">${[ [ "hy", mediaUI.hydra_sizes ], [ "co", mediaUI.cobra_sizes ] ].map(([k, l]) => `<button type="button" role="tab" data-zl="${k}" aria-selected="${zaLine === k}" class="${zaLine === k ? "on" : ""}">${l}</button>`).join("")}</div></div>\n <div class="csz__g"><div class="sz ${zaLine === "hy" ? "sz--hy" : ""}"><div class="sz__in" style="aspect-ratio:1600/1000">${R.slice().reverse().map(r => box(r, r.k === zaOn ? "on" : "", r.n.replace(/ \d+W$/, ""))).join("")}${box({
        w: 610,
        h: 305
    }, "ref", 'XRF bed 24" × 12"')}</div></div>\n <div class="szt"><table><thead><tr><th scope="col">${escapeCopy(mediaUI.model)}</th><th scope="col">${escapeCopy(mediaUI.work_area)}</th><th scope="col">${escapeCopy(mediaUI.z_travel)}</th><th scope="col">${escapeCopy(mediaUI.black_friday)}</th></tr></thead><tbody>${R.map(r => `<tr class="${r.k === zaOn ? "on" : ""}" data-za="${r.k}" tabindex="0"><th scope="row">${r.n}</th><td>${r.bed}<small>${r.mm}</small></td><td>${r.z}</td><td>${r.from ? `<b>${r.ms.length > 1 ? "<small>" + escapeCopy(mediaUI.from) + "</small>" : ""}${$0(r.from)}</b><small>${r.ms.map(m => `<a href="${m[2]}">${m[0]}${r.ms.length > 1 ? " " + $0(m[1]) : ""}</a>`).join(" · ")}</small>` : "—"}</td></tr>`).join("")}</tbody></table></div></div>\n <p class="caption-4 muted">${escapeCopy(mediaUI.work_area_note)}</p></div>`;
}
    listen(document, 'click', e => {
        const tab = e.target.closest('[data-zl]');
        if (tab) { zaLine = tab.dataset.zl; zaOn = null; renderZa(); return; }
        const size = e.target.closest('[data-za]');
        if (size && !e.target.closest('a')) { zaOn = zaOn === size.dataset.za ? null : size.dataset.za; renderZa(); document.querySelector(`#szAll ${size.tagName === 'TR' ? 'tr' : '.sz__r'}[data-za="${size.dataset.za}"]`)?.focus(); }
    });
    listen(document, 'keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-za]')) { e.preventDefault(); e.target.click(); } });

    function apc(p) {
        const i = sel[p.id] ?? (p.def || 0), v = p.v[i], pu = variantUpsell(p, v), r = RL[p.rl] || [], img = v.img || p.img, sk = v.stock || p.stock, tier = v.tier || p.tier, th = v.th || p.th, tg = p.stage ? [(v.tag || p.tag)[0], (firstStage(v) ? v.stage_first_badge || "Limited offer at [price]" : v.stage_second_badge || "After promo qty sells out: [price]").replace("[price]", $0(price1(p, v)))] : v.tag || p.tag, lb = [ ...(v.lb || p.lb).slice(0, 3), ...p.lb.slice(3) ].filter(Boolean);
        const opts = p.v.map((x, j) => `<option value="${j}" ${j === i ? "selected" : ""}>${x.l}</option>`).join("");
        const variantParts = value => value.l.split(' · ');
        const chips = p.v.length > 1 ? `<div class="vch" role="group" aria-label="${escapeCopy(mediaUI.chooseModel)}">${p.v.map((value, index) => `<button type="button" data-sel="${p.id}:${index}" aria-pressed="${index === i}">${escapeCopy(variantParts(value)[0])}</button>`).join('')}</div>${variantParts(v).length > 1 ? `<p class="vch__d">${escapeCopy(variantParts(v).slice(1).join(' · '))}</p>` : ''}` : '';
        let price;
        if (p.stage) {
            const s1 = firstStage(v), prices = stagePrices(v);
            price = `<div class="stg"><div class="${s1 ? "on" : ""}"><span class="caption-4 muted">${v.stage_first_label || "Limited promotional quantity"}</span><div class="heading-6 num">${$(prices.first)}</div></div><div class="${s1 ? "" : "on"}"><span class="caption-4 muted">${v.stage_second_label || "After promo qty sells out"}</span><div class="heading-6 num">${$(prices.second)}</div></div></div>\n  <div class="pb"><div><span class="caption-5 muted">You save</span><span class="saved">${$(Math.max(0, v.m - prices.active))} off MSRP</span></div><div class="sep"></div><div><span class="caption-5 muted">MSRP</span><span class="title-2 ms num">${$(v.m)}</span></div></div>`;
        } else price = `<div class="pb"><div><span class="caption-5 muted">Black Friday price</span><span class="heading-5 num">${$(v.p)}</span><span class="saved">Save ${$(v.m - v.p)}${v.gifts && v.gifts.length > 1 ? " + gifts" : ""}</span></div><div class="sep"></div><div><span class="caption-5 muted">MSRP</span><span class="heading-5 ms num">${$(v.m)}</span></div></div>`;
        return `${p.ttl ? `<h3 class="heading-3" style="text-align:center;margin-bottom:var(--s400)">${p.ttl}</h3>` : ""}<div class="stage" data-bfcm-product="${v.editor_id || ""}">\n  <div class="hero ${th}">${SCENE(img, "22% 50%", v.mn + (v.shown ? " " + v.shown.toLowerCase() : ""), MP(v.mn, v.shown || lb.slice(0, 2).join(" · "), !!v.shown))}<div class="tags"><span class="tag ${tier === "super" ? "" : "blue"}"><i class="ph-fill ph-${tg[0]}"></i>${tg[1]}</span><span class="tag ls"><i class="dot" aria-hidden="true"></i>Limited stock</span>${v.f === 0 ? FSB : ""}</div>\n   <div class="info">\n    <div><div class="tierrow"><span class="tiertag ${tier}"><i class="ph-fill ph-${tier === "super" ? "fire" : "tag"}"></i>${escapeCopy(offerCopy(tier).label)}</span><span class="tiermean ${tier}">${escapeCopy(offerCopy(tier).meaning)}</span></div><h3 class="heading-6">${p.name}</h3><div class="lbls" style="margin-top:8px">${lb.map(x => `<span>${escapeCopy(x)}</span>`).join("")}</div></div>\n    <div class="sel${p.v.length > 1 ? ' multi' : ''}"><label class="sr-only" for="v-${p.id}">Model</label><select id="v-${p.id}" data-p="${p.id}" ${p.v.length < 2 ? "disabled" : ""}>${opts}</select><i class="ph-bold ph-caret-down"></i></div>${chips}\n    ${price}${totalSavings(v, price1(p, v))}\n    ${v.gifts ? `<div class="gifts"><span class="gifts__h"><i class="ph-fill ph-gift"></i>Free with this bundle${v.gifts.some(g => g.val) ? ` · worth ${$0(v.vid === "43972592730146" ? 998 : Math.floor(v.gifts.reduce((a, g) => a + (g.val || 0), 0)))}+` : ""}</span><div class="gifts__l">${v.gifts.map(g => `<div class="gift">${g.img ? `<img src="${S + g.img}?width=160" alt="${g.n}" loading="lazy">` : '<i class="ph-fill ph-stack"></i>'}<span><b>${g.n}</b><small>${g.val ? `${$(g.val)} value` : g.sub || ""}</small></span><em>Free</em></div>`).join("")}</div></div>` : ""}\n    <div class="meta">${stockRow(v)}${ship(v)}${fin}</div>\n    ${v.gift_note ? `<p class="caption-4 gold">${v.gift_note}</p>` : ""}${pu ? `<label class="up"><input type="checkbox" data-up="${p.id}" ${upOn[p.id] ? "checked" : ""}><img src="${CDN}9beab4683ad286661f4bb3a0568b2f8a.png?width=200" alt="${escapeCopy(pu.n)}" width="52" height="52" loading="lazy"><span><b>Complete the setup</b>+ ${pu.n} ${$0(pu.p)}, regular price${upOn[p.id] ? ` · total ${$0(price1(p, v) + pu.p)}` : ""}</span></label>` : ""}\n    ${acts({
            ids: [ v.vid, ...pu && upOn[p.id] ? [ pu.id ] : [] ],
            u: v.u,
            n: v.mn,
            v: price1(p, v) + (pu && upOn[p.id] ? pu.p : 0)
        })}\n   </div></div>\n  ${speedPanel(p.id)}\n  ${p.id === "h07" || p.id === "g2p" ? "" : vreels(p.rl, r)}\n </div>`;
    }
    SUPER[2].lb = SUPER[2].lb.slice(0, 3).concat("2× faster vs avg CO₂ glass");
    const ALLP = [ ...SUPER, ...DEALS ];
    const GROUP = {
        superCards: [ "xrf", "h07", "h09d" ],
        dealCards: [ "vtg", "cob", "g2p" ]
    };
    function renderCards() {
        Object.entries(GROUP).forEach(([c, ids]) => {
            if (!document.getElementById(c)) return;
            document.getElementById(c).innerHTML = ids.map(id => {
                const p = ALLP.find(x => x.id === id);
                return `<section class="apc" id="p-${p.id}">${apc(p)}</section>`;
            }).join("");
        });
        ALLP.forEach(p => slide(p.id, 0));
    }
    function renderLast() {
        if (!lastUnits) return;
        lastUnits.innerHTML = LAST.map(b => `<div class="bc"><div class="im">${SCENE(b.img, "30% 50%", b.n)}<span class="tag red">Limited stock</span>${MP(b.mn)}</div><div><h3 class="title-2">${b.n}</h3><div class="lbls" style="margin-top:8px">${/RF/.test(b.n) ? `<span>${escapeCopy(mediaUI.precision)}</span><span>${escapeCopy(mediaUI.speed)}</span>` : ""}<span>${escapeCopy(mediaUI.stability)}</span></div><div class="pb" style="margin-top:12px"><div><span class="caption-5 muted">Black Friday price</span><span class="heading-5 num">${$(b.p)}</span><span class="saved">Save ${$(b.m - b.p)}</span></div><div class="sep"></div><div><span class="caption-5 muted">MSRP</span><span class="heading-5 ms num">${$(b.m)}</span></div></div></div><div class="meta">${stockRow(b)}${ship(b)}</div>${acts({
            ids: [ b.vid ],
            u: b.u,
            n: b.mn,
            v: b.p,
            sm: 1
        })}</div>`).join("");
    }
    function renderFeat() {
        if (!fx) return;
        const i = sel.feat ?? 0, v = FEAT.v[i];
        fx.innerHTML = `<div class="fx__art">${SCENE(v.img, "30% 50%", v.mn)}<span class="tag"><i class="ph-fill ph-star"></i>Best seller</span>${MP(v.mn, "Glass + 38W RF")}</div>\n <div class="fx__info"><div><h3 class="heading-5">${FEAT.name}</h3><p class="body-6 muted" style="margin-top:8px">${FEAT.desc}</p><div class="lbls" style="margin-top:12px">${FEAT.lb.map(x => `<span>${escapeCopy(x)}</span>`).join("")}</div></div>\n <div class="sel"><label class="sr-only" for="v-feat">Model</label><select id="v-feat" data-p="feat">${FEAT.v.map((x, j) => `<option value="${j}" ${j === i ? "selected" : ""}>${x.l}</option>`).join("")}</select><i class="ph-bold ph-caret-down"></i></div>\n <div><span class="caption-5 muted">Regular price</span><div class="heading-4 num">${$(v.p)}</div><span class="caption-5 muted">Not discounted during Black Friday</span></div>\n <div class="meta">${stockRow(v)}${ship(v)}${fin}</div>\n <div style="margin-top:auto">${acts({
            ids: [ v.vid ],
            u: v.u,
            n: v.mn,
            v: v.p,
            always: 1
        })}</div></div>`;
    }
    const LINES = [ {
        id: "desktop",
        n: "01",
        k: "Desktop lasers",
        t: "XRF 38W RF · VertiGo",
        img: "xrf",
        mp: "XRF 38W RF",
        who: "For home businesses, craft sellers and retail shops.",
        f: [ "Fits on a workbench or a shop counter", "38W RF metal tube", "Flat goods or drinkware" ],
        from: "$4,499",
        off: "Up to $1,000 off",
        fs: 1,
        cta: "See desktop deals"
    }, {
        id: "cobra",
        n: "02",
        k: "Workshop CO₂ lasers",
        t: "Cobra 8 · 10 · 14",
        img: "c14",
        mp: "Cobra 14 130W",
        who: "For woodworkers, sign makers and growing shops.",
        f: [ "Floor standing, 90W to 130W glass tube", 'Beds up to 55.1" × 35.4"', "Autofocus and camera alignment" ],
        from: "$3,999",
        off: "Save $2,000",
        cta: "See Cobra deals"
    }, {
        id: "hydra",
        n: "03",
        k: "Industrial production lasers",
        t: "Hydra series",
        img: "h7g2",
        mp: "Hydra 7 Pro",
        who: "For production shops running orders every day.",
        f: [ "2,000 mm/s and 4G acceleration (Gen2)", "RF detail and cutting in one machine", 'Beds up to 63" × 39.4"' ],
        from: "$5,999",
        off: "Up to $3,000 off",
        cta: "See Hydra deals"
    } ];
    function renderLines() {
        ln3.innerHTML = LINES.map(l => `<a class="ln" href="#${l.id}"><div class="ln__m">${SCENE(l.img, "", l.mp, MP(l.mp))}${l.fs ? FSB : ""}<span class="ln__n" aria-hidden="true">${l.n}</span></div><div class="ln__b"><span class="kick"><i class="stripe" aria-hidden="true"></i>${l.k}</span><h3 class="heading-5">${l.t}</h3><p class="body-6 muted">${l.who}</p><ul>${l.f.map(x => `<li><i class="ph-bold ph-check"></i>${x}</li>`).join("")}</ul><div class="ln__pr"><div><span class="caption-4 muted">Black Friday from</span><b>${l.from}</b></div><span class="saved">${l.off}</span></div><span class="btn primary">${l.cta}<i class="ph-bold ph-arrow-down"></i></span></div></a>`).join("");
    }
    function renderProj() {
        if (!pw) return;
        pw.innerHTML = PROJ.slice(0, 8).map(p => `<figure class="pj" style="margin:0"><div class="ph"><img src="${p[0].startsWith("http") ? p[0] : "https://yonge6.github.io/onelaser-bfcm-2026/assets/projects/" + p[0] + ".webp"}" alt="${p[1]}" loading="lazy"></div><figcaption><span class="title-3" style="display:block">${p[1]}</span><span class="mk caption-4"><i class="ph-fill ph-lightning"></i>Made on ${p[2]}</span></figcaption></figure>`).join("");
    }
    function renderStories(){if (!vg) return; vg.innerHTML=RL.co.map((c,k)=>`<div class="vc" data-set="co" data-k="${k}" role="button" tabindex="0" aria-label="Play video: ${escapeCopy(c[1])} (${vt(c[4])})"><div class="im">${vthumb(c,'maxresdefault')}</div><div class="bd"><h3 class="title-2">${escapeCopy(c[1])}</h3><p class="body-6 muted">${escapeCopy(c[6] || "")}</p></div></div>`).join('');}
    const accessoryImage = value => {
        const url = new URL(/^(https?:)?\/\//.test(value) ? value : S + value, location.origin);
        url.searchParams.set('width', '500');
        return url.href;
    };
    let aSel = "acc";
    function renderA() {
        if (!ag) return;
        document.querySelectorAll("[data-a]").forEach(b => {
            b.classList.toggle("on", b.dataset.a === aSel);
            b.setAttribute("aria-selected", b.dataset.a === aSel);
        });
        ag.innerHTML = ACC[aSel].map(a => `<div class="ac"><div class="im"><img src="${accessoryImage(a[2])}" alt="${a[0].replace(/"/g, "")}" loading="lazy"></div><h3 class="title-3">${a[0]}</h3><div class="heading-6 num">${a[1] ? $(a[1]) : "Free"}</div><div class="acts"><a class="btn dark sm" href="${P + a[3]}" ${a[1] ? `data-add="${a[0].replace(/"/g, '&quot;')}" data-product-handle="${a[3]}" ${a[4] ? `data-cart-items="${a[4]}"` : ""} data-val="${a[1]}"` : ext}>${a[1] ? "Add to cart" : "Book a call"}</a><a class="btn soft sm" href="${P + a[3]}" ${ext}>Details</a></div></div>`).join("");
    }
    const pd = s => new Date(s + "T00:00:00-08:00");
    const FINDER = {
    "xrf": {
        "n": "XRF 38W RF",
        "why": "True 3G acceleration and 1,200 mm/s: 10× faster than diode, 2 to 5× faster than CO₂ glass tube, 1.5 to 2× faster than the average RF desktop. 38W RF with 4× the precision of glass tube, for leather, wood, acrylic, glass and coated metal. $4,499 with a free Air Assist Control and free shipping.",
        "img": "xrfm",
        "a": "#p-xrf",
        "sel": "xrf:0",
        "p": "$4,499"
    },
    "vtg": {
        "n": "VertiGo 38W RF",
        "why": "38W RF built for drinkware, with 4× the precision of glass tube. Loads a tumbler upright, focuses itself and engraves around the full cup. $4,999 with free shipping.",
        "img": "vtgs",
        "a": "#p-vtg",
        "p": "$4,999"
    },
    "c08": {
        "n": "Cobra 8 90W",
        "why": "A 90W glass tube for wood and acrylic cutting in a workshop footprint, with autofocus and 300+ supported materials, 2× faster than the average CO₂ glass tube. $3,999, save $2,000.",
        "img": "c8",
        "a": "#p-cob",
        "sel": "cob:0",
        "p": "$3,999"
    },
    "c14": {
        "n": "Cobra 14 130W",
        "why": "A 130W glass tube and a larger bed for big signs and batch cutting, 2× faster than the average CO₂ glass tube. $6,999, save $2,000.",
        "img": "c14",
        "a": "#p-cob",
        "sel": "cob:2",
        "p": "$6,999"
    },
    "h07": {
        "n": "Hydra 7 Pro",
        "why": "70W RF with 4× the precision of glass tube, 2,000 mm/s and 4G acceleration, built for leather, patches, tags and production runs. 3–4× faster than other RF lasers, 10× the stability. $7,999 for a limited qty, then $8,999.",
        "img": "h7g2",
        "a": "#p-h07",
        "p": "$7,999"
    },
    "h09d": {
        "n": "Hydra 9 Dual",
        "why": "100W glass for cutting and a 38W RF tube for fine engraving at 4× the precision of glass, in one cabinet. 3–4× faster than other RF lasers, 10× the stability. $8,999, limited stock.",
        "img": "h9d",
        "a": "#p-h09d",
        "p": "$8,999"
    },
    "h09p": {
        "n": "Hydra 9 Pro",
        "why": "A 70W RF Gen2 production platform with 4× the precision of glass tube, 2,000 mm/s and 4G acceleration. 3–4× faster than other RF lasers, 10× the stability. $9,999, save $2,000.",
        "img": "h9g2",
        "a": "#p-g2p",
        "sel": "g2p:0",
        "p": "$9,999"
    },
    "hyb": {
        "n": "Hydra 9 Hybrid",
        "why": "Glass cutting plus RF engraving at 4× the precision of glass, current generation, in stock. 3–4× faster than other RF lasers, 10× the stability. Not discounted, and still the machine our production customers buy most.",
        "img": "h9g2",
        "a": "#bestseller",
        "sel": "feat:0",
        "p": "$10,999"
    }
};
    const escapeCopy = v => typeof v === "string" ? v.replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[c])) : v;
    const configRoots = {
        SUPER: SUPER,
        DEALS: DEALS,
        LAST: LAST,
        FEAT: FEAT,
        BENTO: BENTO,
        PROJ: PROJ,
        ACC: ACC,
        RL: RL,
        STORIES: STORIES,
        FINDER: FINDER
    };
    document.querySelectorAll("[data-bfcm-patches]").forEach(el => JSON.parse(el.textContent).filter(Boolean).forEach(p => {
        let o = configRoots;
        for (const k of p.path.slice(0, -1)) o = o[k];
        const k = p.path.at(-1);
        if (p.product) {
            const originalImage = o[k].img || {
                SUPER: SUPER,
                DEALS: DEALS
            }[p.path[0]]?.[p.path[1]]?.img || "h9g2";
            for (const name of [ "mn", "l", "gift_note" ]) p.value[name] = escapeCopy(p.value[name]);
            Object.assign(o[k], p.value);
            o[k].img = "custom_" + o[k].vid;
            CUSTOM_SCENES[o[k].img] = o[k].scene_url;
            MPOS[o[k].img] = MPOS[originalImage];
            if (NOSLACK[originalImage]) NOSLACK[o[k].img] = 1;

        } else o[k] = p.value;
    }));
    function pick(m, s, b) {
        if (m === "drink") return "vtg";
        if (s === "desk") return "xrf";
        if (m === "prod" || s === "floor") {
            return b === "1" ? "c08" : b === "2" ? "h07" : "h09p";
        }
        if (m === "decor") return b === "1" ? "c08" : b === "2" ? "c14" : "h09d";
        return b === "1" ? "xrf" : b === "2" ? "h07" : "h09d";
    }
    function renderFinder() {
        if (!fq || !fr) return;
        const f = new FormData(fq), m = f.get("make"), s = f.get("space"), b = f.get("budget");
        if (!m || !s || !b) {
            fr.innerHTML = `<div class="empty"><i class="ph ph-crosshair"></i><span class="title-2">Your match appears here</span><span class="body-6">Answer all three questions.</span></div>`;
            return;
        }
        const k = pick(m, s, b), x = FINDER[k];
        fr.innerHTML = `<div class="im">${SCENE(x.img, "30% 50%", x.n)}${/free shipping/.test(x.why) ? FSB : ""}${MP(x.n)}</div><div><span class="caption-3 gold">Our pick for you</span><h3 class="heading-5" style="margin-top:4px">${x.n}</h3><p class="body-6 muted" style="margin-top:8px">${x.why}</p></div><div class="acts"><a class="btn primary sm" href="${x.a}"${x.sel ? ` data-sel="${x.sel}"` : ""}>See the deal · ${x.p}</a><a class="btn ghost sm" href="https://www.1laser.com/products/sales-consultation-call" ${ext}>Confirm on a call</a></div>`;
    }
    listen(fq, "change", () => {
        renderFinder();
        fitAll(fr);
    });
    if (fq) {
        fq.querySelectorAll('fieldset').forEach((field, index) => {
            const legend = field.querySelector('legend');
            if (!legend || legend.querySelector('.stepn')) return;
            legend.insertAdjacentHTML('afterbegin', `<b class="stepn" aria-hidden="true">${index + 1}</b>`);
            legend.insertAdjacentHTML('beforeend', '<em class="tap" aria-hidden="true"><i class="ph-fill ph-hand-pointing"></i>Tap one</em>');
        });
        const nudgeFinder = () => {
            let first = true;
            fq.querySelectorAll('fieldset').forEach(field => {
                const done = !!field.querySelector('input:checked');
                field.classList.toggle('done', done);
                field.classList.toggle('nudge', !done && first);
                if (!done) first = false;
            });
        };
        nudgeFinder();
        listen(fq, 'change', nudgeFinder);
        new IntersectionObserver(entries => entries.forEach(entry => fq.classList.toggle('live', entry.isIntersecting)), {rootMargin:'0px 0px -20% 0px'}).observe(fq);
    }
    function updateTimelineHighlights(now = new Date()) {
        document.querySelectorAll('[data-bfcm-timeline]').forEach(timeline => {
            let active = timeline.dataset.manualStage || 'live';
            if (timeline.dataset.mode !== 'manual') {
                active = 'live';
                const stages = [
                    ['thanksgiving', timeline.dataset.thanksgivingAt, '2026-11-26T00:00:00-08:00'],
                    ['black_friday', timeline.dataset.blackFridayAt, '2026-11-27T00:00:00-08:00'],
                    ['cyber_monday', timeline.dataset.cyberMondayAt, '2026-11-30T00:00:00-08:00']
                ];
                stages.forEach(([stage, configured, fallback]) => {
                    const parsed = Date.parse(configured);
                    const boundary = Number.isFinite(parsed) ? parsed : Date.parse(fallback);
                    if (now.getTime() >= boundary) active = stage;
                });
            }
            timeline.querySelectorAll('[data-stage]').forEach(item => {
                const selected = item.dataset.stage === active;
                item.classList.toggle('hl', selected);
                if (selected) item.setAttribute('aria-current', 'step');
                else item.removeAttribute('aria-current');
            });
        });
    }
    function tick() {
        updateTimelineHighlights();
        const n = new Date, z = v => String(v).padStart(2, "0");
        const put = (b, v) => {
            if (b.textContent !== v) {
                b.textContent = v;
                if (!reduce) {
                    b.classList.remove("flip");
                    void b.offsetWidth;
                    b.classList.add("flip");
                }
            }
        };
        const set = (el, t) => {
            if (!el) return;
            const x = Math.max(0, t - n);
            put(el.querySelector("[data-u=d]"), z(Math.floor(x / 864e5)));
            put(el.querySelector("[data-u=h]"), z(Math.floor(x / 36e5) % 24));
            put(el.querySelector("[data-u=m]"), z(Math.floor(x / 6e4) % 60));
            put(el.querySelector("[data-u=s]"), z(Math.floor(x / 1e3) % 60));
        };
        const pre = false;
        document.querySelectorAll("[data-cdl]").forEach(e => e.textContent = n < END ? "Black Friday Deals end in" : "Black Friday Deals have ended");
        set(document.querySelector("[data-cd=main]"), pre ? LAUNCH : END);
        set(document.querySelector("[data-cd=final]"), pre ? LAUNCH : END);
        set(document.querySelector("[data-cd=early]"), END);
    }
    let hv, lastScroll = 0;
    listen(document, "mouseover", e => {
        if (!fine) return;
        const r = e.target.closest(".reel.big");
        if (!r || r.querySelector("iframe")) return;
        clearTimeout(hv);
        hv = setTimeout(() => {
            if (performance.now() - lastScroll < 400 || !r.matches(":hover")) return;
            const x = RL[r.dataset.set][+r.dataset.k];
            if (x[7]) return;
            const f = document.createElement("iframe");
            f.className = "ifr";
            f.title = "Video preview";
            f.allow = "autoplay; encrypted-media";
            f.src = `https://www.youtube-nocookie.com/embed/${x[0]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${x[0]}&modestbranding=1&playsinline=1&rel=0${x[3] ? "&start=" + x[3] : ""}`;
            r.querySelector(".thumb").appendChild(f);
            setTimeout(() => f.classList.add("on"), 700);
        }, 350);
    });
    listen(document, "mouseout", e => {
        const r = e.target.closest(".reel.big");
        if (!r || r.contains(e.relatedTarget)) return;
        clearTimeout(hv);
        r.querySelector("iframe")?.remove();
    });
    function slide(id, d) {
        const t = document.querySelector(`[data-r="${id}"]`);
        if (!t) return;
        const n = t.children.length, vis = Math.max(1, Math.floor((t.parentElement.clientWidth + 24) / 384)), max = Math.max(0, n - vis);
        const i = Math.min(Math.max(0, +t.dataset.i + d), max);
        t.dataset.i = i;
        t.style.transform = `translateX(${-i * 384}px)`;
        const s = t.closest(".reels");
        s.querySelector("[data-rp]").disabled = i === 0;
        s.querySelector("[data-rn]").disabled = i >= max;
    }
    let vs = null, vk = 0, lastFocus = null;
    const lst = () => Array.isArray(vs) ? vs : RL[vs];
    function openV(set, k) {
        if (!vv) return;
        lastFocus = document.activeElement;
        vs = set;
        vk = k;
        showV();
        vv.classList.add("on");
        document.body.style.overflow = "hidden";
        vv.querySelector(".x").focus();
    }
    function showV(){const l=lst(),x=l[vk];vvb.innerHTML=x[7]?`<video src="${escapeCopy(x[7])}" controls autoplay playsinline style="width:100%;height:100%"></video>`:`<iframe src="https://www.youtube-nocookie.com/embed/${x[0]}?autoplay=1&rel=0${x[3]?'&start='+x[3]:''}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="OneLaser video"></iframe>`;vvc.textContent=`${x[1]}${x[2]?' · '+x[2]:''}${l.length>1?`  (${vk+1}/${l.length})`:''}`;vv.querySelectorAll('.nv').forEach(b=>b.style.visibility=l.length>1?'':'hidden')}
    function closeV() {
        vv.classList.remove("on");
        vvb.innerHTML = "";
        document.body.style.overflow = "";
        lastFocus?.focus();
    }
    listen(document, "click", e => {
        const t = e.target;
        const rv = t.closest(".reel,.rentry[data-set],.vc[data-set]");
        if (rv) {
            openV(rv.dataset.set, +rv.dataset.k);
            return;
        }
        const yt = t.closest("[data-yt]");
        if (yt) {
            openV([ [ yt.dataset.yt, yt.dataset.cap || "" ] ], 0);
            return;
        }
        if (t.closest("[data-rp]")) return slide(t.closest("[data-rp]").dataset.rp, -1);
        if (t.closest("[data-rn]")) return slide(t.closest("[data-rn]").dataset.rn, 1);
        if (t.closest("#vv .x") || t.id === "vv") return closeV();
        if (t.closest("#vv .pv")) {
            vk = (vk - 1 + lst().length) % lst().length;
            return showV();
        }
        if (t.closest("#vv .nx")) {
            vk = (vk + 1) % lst().length;
            return showV();
        }
        const a = t.closest("[data-a]");
        if (a) {
            aSel = a.dataset.a;
            return renderA();
        }
    });
    addEventListener("keydown", e => {
        if ((e.key === "Enter" || e.key === " ") && e.target.matches(".reel,.vc[data-set],[data-yt],[data-sel]")) {
            e.preventDefault();
            e.target.click();
        }
        if (!vv || !vv.classList.contains("on")) return;
        if (e.key === "Escape") closeV();
        if (e.key === "ArrowRight") vv.querySelector(".nx").click();
        if (e.key === "ArrowLeft") vv.querySelector(".pv").click();
    });
    listen(document, "change", e => {
        const s = e.target.closest("select[data-p]");
        if (!s) return;
        sel[s.dataset.p] = +s.value;
        if (s.dataset.p === "feat") {
            renderFeat();
            fitAll(fx);
            fx.querySelector("select").focus();
        } else {
            const p = ALLP.find(x => x.id === s.dataset.p);
            const sec = document.getElementById("p-" + p.id);
            sec.innerHTML = apc(p);
            slide(p.id, 0);
            fitAll(sec);
            sec.querySelector("select").focus();
        }
    });
    document.querySelectorAll("[data-form]").forEach(f => listen(f, "submit", async e => {
        e.preventDefault();
        const inp = f.querySelector("input"), row = f.querySelector(".form__row"), msg = f.querySelector(".msg"), btn = f.querySelector("button"), v = inp.value.trim();
        const bad = !v ? "Enter your email address." : !EMAIL.test(v) ? "That email looks incomplete. Check the address and try again." : "";
        row.classList.toggle("err", !!bad);
        msg.className = "msg " + (bad ? "err" : "ok");
        inp.setAttribute("aria-invalid", !!bad);
        if (bad) {
            msg.textContent = bad;
            inp.focus();
            return;
        }
        btn.disabled = true;
        msg.textContent = "Sending…";
        const ok = await submitLead({
            email: v,
            src: f.dataset.src
        });
        btn.disabled = false;
        msg.className = "msg " + (ok ? "ok" : "err");
        msg.textContent = ok ? f.dataset.src === "footer" ? `Thanks. ${v} is subscribed.` : `You are on the list. We will email ${v} if stock runs low and before prices end.` : "We could not save that just now. Try again, or call us at 626 800 4130.";
        if (ok) f.reset();
    }));
    const tl = document.getElementById("tagline");
    if (tl) {
        tl.innerHTML = tl.textContent.split(" ").map(w => `<span class="w${/grateful|\$3,000|holiday|orders\./.test(w) ? " g" : ""}">${w}</span>`).join(" ");
    }
    const words = tl ? [ ...tl.querySelectorAll(".w") ] : [];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const snLinks = [ ...snav?.querySelectorAll("a") || [] ].map(a => [ a, document.querySelector(a.getAttribute("href")) ]);
    let tagOn = false, curNav = null, ticking = false;
    new IntersectionObserver(es => {
        tagOn = es[0].isIntersecting;
    }).observe(tl);
    function onScroll() {
        ticking = false;
        const y = 200;
        let c = null;
        for (const [a, sec] of snLinks) {
            if (sec && sec.getBoundingClientRect().top < y) c = a; else break;
        }
        if (c !== curNav) {
            curNav?.classList.remove("on");
            c?.classList.add("on");
            curNav = c;
            if (c) {
                const box = snav, left = c.offsetLeft - box.clientWidth / 2 + c.clientWidth / 2;
                box.scrollTo({
                    left: left,
                    behavior: "smooth"
                });
            }
        }
        if (tagOn && !reduce) {
            const line = innerHeight * .62;
            for (const w of words) w.classList.toggle("on", w.getBoundingClientRect().top < line);
        }
    }
    addEventListener("scroll", () => {
        lastScroll = performance.now();
        clearTimeout(hv);
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(onScroll);
        }
    }, {
        passive: true
    });
    let rz;
    addEventListener("resize", () => {
        clearTimeout(rz);
        rz = setTimeout(() => ALLP.forEach(p => slide(p.id, 0)), 150);
    });
    function countUp(el) {
        const to = +el.dataset.count, t0 = performance.now(), d = 1200;
        if (reduce) {
            el.textContent = $0(to);
            return;
        }
        const f = now => {
            const p = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - p, 3);
            el.textContent = $0(Math.round(to * e));
            if (p < 1) requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
    }
    (() => {
        if (reduce) return;
        const kv = document.querySelector(".kv");
        if (!kv) return;
        const art = kv.querySelector(".kv__art"), txt = kv.querySelector(".kv__c"), prog = document.getElementById("progress");
        const vis = new Set;
        const pio = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)), {
            rootMargin: "100px"
        });
        const watch = () => document.querySelectorAll(".hero .scene,.tl .scene,.ln .scene,.bc .scene,.fx__art .scene,.pj").forEach(el => {
            if (!el.dataset.px) {
                el.dataset.px = 1;
                pio.observe(el);
            }
        });
        watch();
        new MutationObserver(watch).observe(document.getElementById("main"), {
            childList: true,
            subtree: true
        });
        let mx = 0, my = 0, tick2 = false;
        function frame() {
            tick2 = false;
            const y = scrollY, vh = innerHeight;
            const hh = kv.offsetHeight;
            if (y < hh) {
                art.style.setProperty("--hy", y * .35 + "px");
                art.style.setProperty("--mx", mx * -14 + "px");
                txt.style.setProperty("--ty", y * .18 + "px");
                txt.style.setProperty("--to", Math.max(0, 1 - y / (hh * .75)).toFixed(3));
            }
            prog?.style.setProperty("--p", (y / Math.max(1, document.documentElement.scrollHeight - vh)).toFixed(4));
            vis.forEach(el => {
                const r = el.getBoundingClientRect(), c = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
                if (el.classList.contains("pj")) {
                    const col = [ ...el.parentElement.children ].indexOf(el) % 4;
                    el.style.transform = `translate3d(0,${(c * (col % 2 ? -18 : 12)).toFixed(1)}px,0)`;
                    return;
                }
                const img = el.querySelector("img");
                if (!img) return;
                const slack = Math.max(0, img.offsetHeight - el.clientHeight);
                img.style.setProperty("--py", (-c * Math.min(slack * .45, 40)).toFixed(1) + "px");
            });
        }
        const req = () => {
            if (!tick2) {
                tick2 = true;
                requestAnimationFrame(frame);
            }
        };
        addEventListener("scroll", req, {
            passive: true
        });
        addEventListener("resize", req);
        req();
        if (fine) {
            listen(kv, "pointermove", e => {
                const r = kv.getBoundingClientRect();
                mx = (e.clientX - r.left) / r.width - .5;
                my = (e.clientY - r.top) / r.height - .5;
                req();
            });
            listen(kv, "pointerleave", () => {
                mx = 0;
                req();
            });
            listen(document, "pointermove", e => {
                const t = e.target.closest(".tl,.bc,.ln");
                document.querySelectorAll(".tilt.hov").forEach(x => {
                    if (x !== t) {
                        x.classList.remove("hov");
                        x.style.setProperty("--rx", "0deg");
                        x.style.setProperty("--ry", "0deg");
                    }
                });
                if (t) {
                    t.classList.add("tilt", "hov");
                    const r = t.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
                    t.style.setProperty("--ry", ((px - .5) * 7).toFixed(2) + "deg");
                    t.style.setProperty("--rx", ((.5 - py) * 6).toFixed(2) + "deg");
                    t.style.setProperty("--gx", px * 100 + "%");
                    t.style.setProperty("--gy", py * 100 + "%");
                }
                const inf = e.target.closest(".info");
                if (inf) {
                    const r = inf.getBoundingClientRect();
                    inf.style.setProperty("--sx", e.clientX - r.left + "px");
                    inf.style.setProperty("--sy", e.clientY - r.top + "px");
                }
                const b = e.target.closest(".btn.primary.lg");
                document.querySelectorAll(".btn.mag").forEach(x => {
                    if (x !== b) {
                        x.style.transform = "";
                    }
                });
                if (b) {
                    b.classList.add("mag");
                    const r = b.getBoundingClientRect();
                    b.style.transform = `translate(${((e.clientX - r.left) / r.width - .5) * 10}px,${((e.clientY - r.top) / r.height - .5) * 8}px)`;
                }
            }, {
                passive: true
            });
        }
        const cv = document.getElementById("embers"), cx = cv.getContext("2d");
        let W2, H2, run = true, parts = [];
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        function size() {
            W2 = kv.clientWidth;
            H2 = kv.clientHeight;
            cv.width = W2 * dpr;
            cv.height = H2 * dpr;
            cv.style.width = W2 + "px";
            cv.style.height = H2 + "px";
            cx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        function spawn(init) {
            const x = W2 * (.42 + Math.random() * .58);
            return {
                x: x,
                y: init ? Math.random() * H2 : H2 * (.75 + Math.random() * .3),
                r: .6 + Math.random() * 1.8,
                vy: .25 + Math.random() * .7,
                vx: (Math.random() - .5) * .3,
                life: 0,
                max: 220 + Math.random() * 260,
                h: Math.random() < .7 ? "255,150,60" : "255,215,140"
            };
        }
        size();
        addEventListener("resize", size);
        for (let i = 0; i < (innerWidth < 761 ? 22 : 46); i++) parts.push(spawn(true));
        new IntersectionObserver(es => {
            run = es[0].isIntersecting;
            if (run) loop();
        }).observe(kv);
        function loop() {
            if (!run || document.hidden) return;
            cx.clearRect(0, 0, W2, H2);
            for (const p of parts) {
                p.life++;
                p.y -= p.vy;
                p.x += p.vx + Math.sin((p.life + p.r * 40) / 40) * .25;
                const a = Math.sin(Math.PI * Math.min(1, p.life / p.max));
                cx.beginPath();
                cx.fillStyle = `rgba(${p.h},${(a * .85).toFixed(3)})`;
                cx.shadowColor = `rgba(${p.h},.9)`;
                cx.shadowBlur = 8;
                cx.arc(p.x, p.y, p.r, 0, 6.283);
                cx.fill();
                if (p.life > p.max || p.y < -10) Object.assign(p, spawn(false));
            }
            requestAnimationFrame(loop);
        }
        listen(document, "visibilitychange", () => {
            if (!document.hidden && run) loop();
        });
        loop();
    })();
    const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const KL = {
        co: CAMPAIGN.company || "WcMKq4",
        list: CAMPAIGN.list || "T6hLmh",
        rev: "2024-10-15"
    };
    const dl = o => {
        (window.dataLayer = window.dataLayer || []).push(o);
    };
    const normPhone = v => {
        const d = (v || "").replace(/\D/g, "");
        return d.length === 10 ? "+1" + d : d.length === 11 && d[0] === "1" ? "+" + d : "";
    };
    async function submitLead(d) {
        const h = {
            "Content-Type": "application/json",
            accept: "application/json",
            revision: d.src === "giveaway" ? "2026-10-15" : KL.rev
        }, ph = normPhone(d.phone);
        const post = (path, body) => fetch(`https://a.klaviyo.com/client/${path}/?company_id=${KL.co}`, {
            method: "POST",
            headers: h,
            body: JSON.stringify(body)
        }).then(r => r.ok).catch(() => false);
        const sub = post("subscriptions", {
            data: {
                type: "subscription",
                attributes: {
                    custom_source: "BFCM 2026 landing page",
                    profile: {
                        data: {
                            type: "profile",
                            attributes: {
                                email: d.email,
                                ...(ph ? {phone_number: ph} : {}),
                                ...(d.src === "giveaway" ? {
                                    subscriptions: {
                                        email: {marketing: {consent: "SUBSCRIBED"}}
                                    }
                                } : {})
                            }
                        }
                    }
                },
                relationships: {
                    list: {
                        data: {
                            type: "list",
                            id: d.src === "giveaway" ? "V62z4f" : KL.list
                        }
                    }
                }
            }
        });
        const ev = post("events", {
            data: {
                type: "event",
                attributes: {
                    properties: {
                        source: d.src || "page",
                        interest: d.interest || "",
                        wants_call: !!d.call,
                        phone: d.phone || "",
                        page: location.origin + location.pathname
                    },
                    metric: {
                        data: {
                            type: "metric",
                            attributes: {
                                name: d.metric || "BFCM 2026 Lead"
                            }
                        }
                    },
                    profile: {
                        data: {
                            type: "profile",
                            attributes: {
                                email: d.email,
                                ...ph ? {
                                    phone_number: ph
                                } : {},
                                properties: {
                                    bfcm2026_interest: d.interest || "",
                                    bfcm2026_wants_call: !!d.call,
                                    ...(d.src === "giveaway" ? {
                                        bfcm2026_giveaway: true,
                                        bfcm2026_giveaway_phone: ph
                                    } : {})
                                }
                            }
                        }
                    }
                }
            }
        });
        const [a, b] = await Promise.all([ sub, ev ]), ok = a && b;
        if (ok) {
            try {
                if (d.src !== "giveaway") localStorage.setItem("ol_bfcm_lead", "1");
            } catch (e) {}
            dl({
                event: "generate_lead",
                lead_source: d.src || "page",
                interest: d.interest || ""
            });
        }
        return ok;
    }
    const giveawayResults = new Map();
    async function submitGiveaway(form, data) {
        const endpoint = form.dataset.giveawayEndpoint?.trim();
        if (!endpoint) return submitLead(data);
        let target;
        try {
            target = new URL(endpoint, location.origin);
            if (target.protocol !== 'https:' || target.username || target.password) return false;
        } catch { return false; }
        const key = data.email.toLowerCase() + ':' + normPhone(data.phone);
        const saved = giveawayResults.get(key) || {};
        const sendCrm = async () => {
            try {
                const response = await fetch(target.href, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email: data.email, phone: normPhone(data.phone)}),
                    signal: AbortSignal.timeout(15000),
                    credentials: 'omit',
                    redirect: 'error'
                });
                return response.ok && (await response.json()).accepted === true;
            } catch { return false; }
        };
        const [klaviyo, crm] = await Promise.all([
            saved.klaviyo ? true : submitLead(data).catch(() => false),
            saved.crm ? true : sendCrm()
        ]);
        giveawayResults.set(key, {klaviyo, crm});
        return klaviyo && crm;
    }
    document.querySelectorAll('[data-gw]').forEach(form => listen(form, 'submit', async event => {
        event.preventDefault();
        const emailInput = form.querySelector('[name="email"]'), phoneInput = form.querySelector('[name="phone"]'), message = form.querySelector('.msg'), button = form.querySelector('button[type="submit"]');
        if (button.disabled) return;
        const email = emailInput.value.trim(), phone = phoneInput.value.trim();
        const emailError = !email ? mediaUI.giveaway_email_required : !EMAIL.test(email) ? mediaUI.giveaway_email_invalid : '';
        const phoneError = !phone ? mediaUI.giveaway_phone_required : !/^\+1[2-9]\d{2}[2-9]\d{6}$/.test(normPhone(phone)) ? mediaUI.giveaway_phone_invalid : '';
        emailInput.setAttribute('aria-invalid', !!emailError);
        phoneInput.setAttribute('aria-invalid', !!phoneError);
        const error = emailError || phoneError;
        message.className = 'msg ' + (error ? 'err' : 'ok');
        if (error) { message.textContent = error; (emailError ? emailInput : phoneInput).focus(); return; }
        button.disabled = true; message.textContent = mediaUI.sending;
        const ok = await submitGiveaway(form, {email, phone, src: 'giveaway', interest: 'material pack giveaway', metric: 'BFCM 2026 Giveaway'});
        button.disabled = false; message.className = 'msg ' + (ok ? 'ok' : 'err');
        message.textContent = ok ? mediaUI.giveaway_success : mediaUI.giveaway_error;
        if (ok) form.reset();
    }));
    const lm = document.getElementById("lm"), lmF = document.getElementById("lmF"), lmOk = document.getElementById("lmOk"), $id = x => document.getElementById(x);
    const [lmE, lmPh, lmI, lmC, lmS, lmM, lmK, lmT, lmP] = [ "lmE", "lmPh", "lmI", "lmC", "lmS", "lmM", "lmK", "lmT", "lmP" ].map($id);
    const lmCrm = $id('lmCrm'), lmCrmEmbed = lmCrm?.querySelector('.pipedriveWebForms');
    const lmCrmStatus = $id('lmCrmStatus');
    let crmTimeout = null;
    const crmStatus = state => {
        if (!lmCrmEmbed) return;
        lmCrmEmbed.dataset.state = state;
        lmCrmEmbed.setAttribute('aria-busy', String(state === 'loading'));
        if (lmCrmStatus) {
            lmCrmStatus.hidden = state === 'ready';
            lmCrmStatus.textContent = state === 'error' ? lmCrmStatus.dataset.error : lmCrmStatus.dataset.loading;
        }
        if (state !== 'loading') window.clearTimeout(crmTimeout);
    };
    const expertFormURL = () => {
        try {
            const url = new URL(lmCrmEmbed?.dataset.pdWebforms || '');
            if (url.protocol === 'https:' && url.hostname === 'webforms.pipedrive.com' && /^\/f\/[A-Za-z0-9]+\/?$/.test(url.pathname)) return url;
        } catch (error) {}
        return null;
    };
    function prepareCrmForm(foreground = false) {
        if (!lmCrmEmbed || !expertFormURL()) return;
        if (lmCrmEmbed.dataset.state === 'ready' || (!foreground && lmCrmEmbed.dataset.state === 'error')) return;
        if (foreground && lmCrmEmbed.dataset.state === 'error') {
            const frame = lmCrmEmbed.querySelector('iframe');
            if (frame) frame.src = frame.src;
            else {
                lmCrmEmbed.replaceChildren();
                lmCrmEmbed.removeAttribute('id');
                delete lmCrmEmbed.dataset.loading;
            }
        }
        crmStatus('loading');
        if (foreground) {
            window.clearTimeout(crmTimeout);
            crmTimeout = setTimeout(() => crmStatus('error'), 20000);
        }
        if (lmCrmEmbed.dataset.loading) return;
        lmCrmEmbed.dataset.loading = 'true';
        const script = document.createElement('script');
        script.src = 'https://webforms.pipedrive.com/f/loader';
        script.async = true;
        script.addEventListener('load', () => {
            const frame = lmCrmEmbed.querySelector('iframe');
            if (frame) frame.title = lmCrm.querySelector('h2').textContent.trim();
            else crmStatus('error');
        });
        script.addEventListener('error', () => {
            delete lmCrmEmbed.dataset.loading;
            script.remove();
            crmStatus('error');
        });
        lmCrmEmbed.appendChild(script);
    }
    listen(window, 'message', event => {
        const frame = lmCrmEmbed?.querySelector('iframe');
        const data = event.data;
        if (event.origin !== 'https://webforms.pipedrive.com' || !frame || event.source !== frame.contentWindow) return;
        if (data?.type === 0 && data.payload?.source === 'pipedriveWebForms' && Number(data.payload.height) > 160) crmStatus('ready');
    });
    let crmScheduled = false;
    const scheduleCrmForm = () => {
        if (crmScheduled || !lmCrmEmbed || !expertFormURL()) return;
        crmScheduled = true;
        if ('requestIdleCallback' in window) {
            const id = window.requestIdleCallback(() => prepareCrmForm(), {timeout: 1500});
            cleanup.push(() => window.cancelIdleCallback(id));
        } else setTimeout(() => prepareCrmForm(), 300);
    };
    if (document.readyState === 'complete') scheduleCrmForm();
    else listen(window, 'load', scheduleCrmForm, {once: true});
    setTimeout(scheduleCrmForm, 2500);
    const warmCrmOnIntent = event => {
        if (event.target.closest?.('[data-call="1"]')) prepareCrmForm();
    };
    listen(document, 'pointerover', warmCrmOnIntent, {passive: true});
    listen(document, 'focusin', warmCrmOnIntent);
    listen(document, 'touchstart', warmCrmOnIntent, {passive: true});
    let lmLast = null, lmSrc = "page";
    function openLead(o = {}) {
        if (!lm) {
            location.href = "/pages/sales-consultation";
            return;
        }
        if (!lm.hidden) return;
        lmLast = document.activeElement;
        lmSrc = o.src || "page";
        const n = o.n || "", call = !!o.call;
        lmF.hidden = false;
        lmOk.hidden = true;
        lmM.textContent = "";
        lmM.className = "msg";
        lmS.disabled = false;
        const useCrm = call && lmCrm && lmCrmEmbed && expertFormURL();
        lm.classList.toggle('lm--crm', !!useCrm);
        if (lmCrm) lmCrm.hidden = !useCrm;
        lmF.hidden = !!useCrm;
        lm.querySelector('.lm__box').setAttribute('aria-labelledby', useCrm ? 'lmCrmTitle' : 'lmT');
        if (useCrm) prepareCrmForm(true);
        lmI.value = [ ...lmI.options ].some(x => x.text === n) ? n : "";
        lmC.checked = call;
        if (call) {
            lmK.textContent = "Free advice, no pressure";
            lmT.textContent = "Talk to a laser expert";
            lmP.textContent = `Leave your number and a OneLaser laser expert will call you${n ? " about the " + n : ""}. Prefer to call now? 626 800 4130.`;
            lmS.textContent = "Request a call";
        } else {
            lmK.textContent = "Limited stock · can sell out anytime";
            lmT.textContent = n ? `Hold off on the ${n}?` : "Not ready today?";
            lmP.textContent = "Get a reminder before Black Friday prices end, and a heads up when stock runs low on the machine you want.";
            lmS.textContent = "Remind me";
        }
        lm.hidden = false;
        document.body.style.overflow = "hidden";
        requestAnimationFrame(() => requestAnimationFrame(() => lm.classList.add("on")));
        setTimeout(() => (useCrm ? lm.querySelector('.lm__x') : call ? lmPh : lmE).focus(), 80);
        dl({
            event: "bfcm_lead_open",
            lead_source: lmSrc
        });
    }
    function closeLead() {
        if (!lm || lm.hidden) return;
        lm.classList.remove("on");
        document.body.style.overflow = "";
        setTimeout(() => {
            lm.hidden = true;
        }, 300);
        lmLast?.focus?.();
    }
    listen(lmF, "submit", async e => {
        e.preventDefault();
        const email = lmE.value.trim(), phone = lmPh.value.trim(), call = lmC.checked;
        const bad = !email ? "Enter your email address." : !EMAIL.test(email) ? "That email looks incomplete. Check it and try again." : call && !normPhone(phone) ? "Add a 10 digit U.S. phone number so our expert can call you." : phone && !normPhone(phone) ? "Enter a 10 digit U.S. phone number, or leave it blank." : "";
        lmM.className = "msg" + (bad ? " err" : "");
        lmM.textContent = bad;
        if (bad) {
            (/phone/.test(bad) ? lmPh : lmE).focus();
            return;
        }
        lmS.disabled = true;
        const lbl = lmS.textContent;
        lmS.textContent = "Sending…";
        const ok = await submitLead({
            email: email,
            phone: phone,
            call: call,
            interest: lmI.value,
            src: lmSrc
        });
        lmS.disabled = false;
        lmS.textContent = lbl;
        if (!ok) {
            lmM.className = "msg err";
            lmM.textContent = "We could not save that just now. Try again, or call us at 626 800 4130.";
            return;
        }
        lmF.hidden = true;
        lmOk.hidden = false;
        $id("lmOkP").textContent = call ? `Thanks. A laser expert will call you at ${phone}.` : LIVE() ? `We will remind ${email} before Black Friday prices end.` : `We will remind ${email} before Black Friday prices end.`;
        lmOk.querySelector("button").focus();
    });
    addEventListener("keydown", e => {
        if (!lm || lm.hidden) return;
        if (e.key === "Escape") return closeLead();
        if (e.key === "Tab" && lm) {
            const f = [ ...lm.querySelectorAll("button,input,select,a[href],iframe") ].filter(x => x.offsetParent);
            const a = f[0], z = f[f.length - 1];
            if (e.shiftKey && document.activeElement === a) {
                e.preventDefault();
                z.focus();
            } else if (!e.shiftKey && document.activeElement === z) {
                e.preventDefault();
                a.focus();
            }
        }
    });
    listen(document, "click", e => {
        const t = e.target;
        if (t.closest("[data-lmx]")) return closeLead();
        const ds = t.closest("[data-sel]");
        if (ds) {
            const [id, ix] = ds.dataset.sel.split(":");
            const select = document.getElementById(`v-${id}`);
            if (select && [...select.options].some(option => option.value === ix)) {
                select.value = ix;
                select.dispatchEvent(new Event('change', {bubbles: true}));
            }
        }
        const l = t.closest("[data-lead]");
        if (l) {
            e.preventDefault();
            return openLead({
                n: l.dataset.lead,
                call: l.dataset.call,
                src: l.dataset.src || (l.closest("#sbar") ? "sticky_bar" : "card")
            });
        }
        const b = t.closest("[data-buy]");
        if (b) dl({
            event: b.dataset.buy ? "begin_checkout" : "add_to_cart",
            ecommerce: {
                currency: "USD",
                value: +b.dataset.val || 0,
                items: [ {
                    item_name: b.dataset.buy || b.dataset.add,
                    price: +b.dataset.val || 0,
                    quantity: 1
                } ]
            }
        });
    });
    const spdCount = el => el.querySelectorAll("[data-cu]").forEach(b => {
        const n = +b.dataset.cu, sf = b.dataset.sfx || "", t0 = performance.now(), d = 1400;
        const f = t => {
            const k = Math.min(1, (t - t0) / d), v = Math.round(n * (1 - Math.pow(1 - k, 3)));
            b.textContent = v.toLocaleString("en-US") + sf;
            if (k < 1) requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
    });
    const spdIO = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add("in");
            spdCount(e.target);
            spdIO.unobserve(e.target);
        }
    }), {
        rootMargin: "0px 0px -15% 0px"
    });
    const armSpd = () => document.querySelectorAll(".spd:not(.armed)").forEach(e => {
        e.classList.add("armed");
        reduce ? e.classList.add("in") : spdIO.observe(e);
    });
    new MutationObserver(armSpd).observe(document.getElementById("main"), {
        childList: true,
        subtree: true
    });
    const seenLead = () => {
        try {
            return localStorage.getItem("ol_bfcm_lead") || sessionStorage.getItem("ol_bfcm_pop");
        } catch (e) {
            return 1;
        }
    };
    function autoPop(src) {
        if (document.querySelector("[data-kl-scroll-locking-modal]")) return;
        if (!lm || window.Shopify?.designMode) return;
        if (seenLead() || !lm.hidden || vv.classList.contains("on")) return;
        try {
            sessionStorage.setItem("ol_bfcm_pop", "1");
        } catch (e) {}
        openLead({
            src: src
        });
    }
    const tLoad = performance.now();
    if (fine) listen(document, "mouseout", e => {
        if (!e.relatedTarget && e.clientY <= 4 && performance.now() - tLoad > 8e3) autoPop("exit_intent");
    });
    setTimeout(() => autoPop("timer"), 6e4);
    let deep = false;
    addEventListener("scroll", () => {
        if (deep || fine) return;
        if (scrollY > (document.documentElement.scrollHeight - innerHeight) * .55) {
            deep = true;
            autoPop("scroll_depth");
        }
    }, {
        passive: true
    });
    const sbar = $id("sbar"), sbK = $id("sbK"), sbN = $id("sbN"), sbP = $id("sbP"), sbA = $id("sbA");
    let sbCur = null, heroIn = true, endIn = false;
    const ratios = new Map;
    function sbData(id) {
        if (id === "fx") {
            const v = FEAT.v[sel.feat ?? 0];
            return {
                n: v.mn,
                k: "Best seller · regular price",
                p: v.p,
                f: v.f,
                ids: [ v.vid ],
                always: 1
            };
        }
        const p = ALLP.find(x => "p-" + x.id === id);
        if (!p) return null;
        const v = p.v[sel[p.id] ?? (p.def || 0)], pr = price1(p, v), up = variantUpsell(p, v) && upOn[p.id];
        return {
            n: v.mn + (up ? " + Auto Conveyor" : ""),
            k: offerCopy(v.tier || p.tier).label,
            p: pr + (up ? p.up.p : 0),
            m: v.m + (up ? p.up.p : 0),
            f: v.f,
            ids: [ v.vid, ...up ? [ p.up.id ] : [] ]
        };
    }
    function drawSb() {
        if (!sbK || !sbN || !sbP || !sbA) return;
        const d = sbCur && sbData(sbCur);
        if (!d) {
            sbK.textContent = "Black Friday Deals";
            sbN.textContent = "Up to $3,000 off · ends Cyber Monday";
            sbP.innerHTML = FSB + '<span class="sbar__fs">XRF and VertiGo</span>';
            sbA.innerHTML = '<a class="btn primary" href="#super">Shop the deals</a>';
            return;
        }
        sbK.textContent = d.k + " · Limited stock";
        sbN.textContent = d.n;
        sbP.innerHTML = `<b class="num">${$0(d.p)}</b>${d.m ? `<s>${$0(d.m)}</s>` : ""}${d.f === 0 ? FSB : ""}`;
        sbA.innerHTML = `<a class="btn primary" href="${ADD(d.ids)}" data-add="${d.n}" data-cart-items="${d.ids.join(',')}" data-val="${d.p}"><i class="ph-bold ph-shopping-cart-simple"></i>Add to cart</a>`;
    }
    function sbShow() {
        if (!sbar || !lm) return;
        sbar.classList.toggle("on", !heroIn && !endIn && lm.hidden);
    }
    const sbo = new IntersectionObserver(es => {
        es.forEach(e => ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0));
        let best = null, br = 0;
        ratios.forEach((r, el) => {
            if (r > br) {
                br = r;
                best = el;
            }
        });
        const id = br > .2 ? best.id : null;
        if (id !== sbCur) {
            sbCur = id;
            drawSb();
        }
    }, {
        threshold: [ 0, .2, .4, .6, .8 ]
    });
    new IntersectionObserver(es => {
        heroIn = es[0].isIntersecting;
        sbShow();
    }, {
        rootMargin: "-120px 0px 0px 0px"
    }).observe(document.querySelector(".kv"));
    const endEls = [ document.querySelector(".final"), document.querySelector(".ft") ], endMap = new Map;
    new IntersectionObserver(es => {
        es.forEach(e => endMap.set(e.target, e.isIntersecting));
        endIn = [ ...endMap.values() ].some(Boolean);
        sbShow();
    }).observe(endEls[0]);
    new IntersectionObserver(es => {
        es.forEach(e => endMap.set(e.target, e.isIntersecting));
        endIn = [ ...endMap.values() ].some(Boolean);
        sbShow();
    }).observe(endEls[1]);
    new MutationObserver(sbShow).observe(lm, {
        attributes: true,
        attributeFilter: [ "hidden" ]
    });
    listen(document, "change", e => {
        const u = e.target.closest("[data-up]");
        if (u) {
            upOn[u.dataset.up] = u.checked;
            const p = ALLP.find(x => x.id === u.dataset.up), sec = $id("p-" + p.id);
            sec.innerHTML = apc(p);
            slide(p.id, 0);
            fitAll(sec);
            sec.querySelector("[data-up]").focus();
        }
        if (e.target.closest("select[data-p],[data-up]")) drawSb();
    });
    let wasLive = LIVE();
    function syncLive() {
        const live = LIVE();
        document.querySelectorAll("[data-alt]").forEach(b => {
            b.textContent = "Talk to a laser expert";
            b.dataset.call = "1";
        });
        document.querySelectorAll(".lights").forEach(x => x.classList.toggle("out", live));
    }
    setInterval(() => {
        const l = LIVE();
        if (l !== wasLive) {
            wasLive = l;
            renderCards();
            renderLast();
    renderZa();
            renderFeat();
            fitAll();
            ratios.clear();
            document.querySelectorAll(".apc,#fx").forEach(el => sbo.observe(el));
            drawSb();
            syncLive();
        }
    }, 5e3);
    const io = new IntersectionObserver(es => es.forEach(en => {
        if (en.isIntersecting) {
            en.target.classList.add("in");
            en.target.querySelectorAll("[data-count]").forEach(countUp);
            io.unobserve(en.target);
        }
    }), {
        rootMargin: "0px 0px -10% 0px"
    });
    const stagedHydra = SUPER.find(product => product.id === 'h07');
    if (stagedHydra) {
        const variant = stagedHydra.v[0], price = price1(stagedHydra, variant);
        const overview = document.querySelector('[data-bfcm-overview-card][href="#p-h07"]');
        if (overview) {
            const amount = overview.querySelector('[data-count]');
            const caption = overview.querySelector('.row .caption-4');
            const savings = Math.max(0, Number(variant.m) - price);
            if (amount) { amount.dataset.count = String(savings); amount.textContent = $0(savings); }
            if (caption) caption.textContent = firstStage(variant) ? variant.stage_first_label || 'First 14 units' : variant.stage_second_label || 'Unit 15 onward';
        }
        if (FINDER.h07) {
            const oldPrice = FINDER.h07.p;
            FINDER.h07.p = $0(price);
            FINDER.h07.why = FINDER.h07.why.replace(oldPrice, FINDER.h07.p);
            if (!firstStage(variant)) FINDER.h07.why = FINDER.h07.why.replace('for the first 14 units', 'from unit 15 onward');
        }
    }
(() => {
    const box = $id('trustv');
    if (!box || reduce || navigator.connection?.saveData) return;
    const host = box.closest('.trust'), button = $id('trustp');
    let video = null, paused = false, inView = false, revealTimer;
    const wanted = () => inView && !paused && !document.hidden && !vv.classList.contains('on');
    const sync = () => { if (!video) return; if (wanted()) video.play()?.catch(() => {}); else video.pause(); };
    const load = () => {
        const source = matchMedia('(max-width:760px)').matches ? box.dataset.mobile : box.dataset.desktop;
        if (!source) return;
        video = document.createElement('video'); video.muted = video.defaultMuted = true; video.loop = video.playsInline = true;
        video.setAttribute('muted', ''); video.setAttribute('playsinline', ''); video.preload = 'metadata'; video.tabIndex = -1; video.disablePictureInPicture = true; video.src = source;
        listen(video, 'playing', () => { clearTimeout(revealTimer); revealTimer = setTimeout(() => { if (!paused && !video.paused) { box.classList.add('on'); host.classList.add('vid'); } }, 150); });
        box.append(video); sync();
    };
    listen(button, 'click', () => { paused = !paused; button.firstElementChild.className = paused ? 'ph-fill ph-play' : 'ph-fill ph-pause'; button.setAttribute('aria-label', paused ? mediaUI.playBackground : mediaUI.pauseBackground); sync(); });
    new IntersectionObserver((entries, observer) => { if (entries[0].isIntersecting) { observer.disconnect(); load(); } }, {rootMargin:'500px'}).observe(host);
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); }).observe(host);
    listen(document, 'visibilitychange', sync); new MutationObserver(sync).observe(vv, {attributes:true, attributeFilter:['class']});
    cleanup.push(() => { clearTimeout(revealTimer); video?.pause(); video?.remove(); host.classList.remove('vid'); box.classList.remove('on'); });
})();
    const nativeMenu = document.querySelector('header-drawer details');
    if (nativeMenu) {
        const syncMenu = () => document.documentElement.classList.toggle('bfcm-menu-open', nativeMenu.open);
        listen(nativeMenu, 'toggle', syncMenu);
        cleanup.push(() => document.documentElement.classList.remove('bfcm-menu-open'));
    }
    renderCards();
    renderLast();
    renderZa();
    renderFeat();
    renderProj();
    renderStories();
    renderA();
    renderFinder();
    fitAll();
    tick();
    document.querySelectorAll(".apc,#fx").forEach(el => sbo.observe(el));
    drawSb();
    syncLive();
    armSpd();
    setInterval(() => {
        if (!document.hidden) tick();
    }, 1e3);
    onScroll();
    document.querySelectorAll(".stag").forEach(g => [ ...g.children ].forEach((c, i) => c.style.setProperty("--d", Math.min(i * 70, 560) + "ms")));
    document.querySelectorAll(".rv,.stag,.apc .stage").forEach(el => {
        if (!el.classList.contains("stag")) el.classList.add("rv");
        io.observe(el);
    });
    listen(document, "shopify:block:select", e => {
        const card = document.querySelector('[data-bfcm-product="' + e.detail.blockId + '"]');
        if (card) card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    const imageStates = new WeakMap();
    const watchImage = img => {
        if (imageStates.has(img)) return;
        if (img.complete) { imageStates.set(img, true); return; }
        const host = img.closest('.scene, .im, .ph') || img.parentElement || img;
        host.classList.add('imldh');
        img.classList.add('imld');
        const done = () => {
            host.classList.remove('imldh');
            img.classList.remove('imld');
            if (getComputedStyle(img).animationName === 'none') {
                img.classList.add('imin');
                setTimeout(() => img.classList.remove('imin'), 600);
            }
        };
        imageStates.set(img, true);
        listen(img, 'load', done, {once:true});
        listen(img, 'error', done, {once:true});
    };
    const campaignRoot = document.getElementById('main');
    new MutationObserver(changes => changes.forEach(change => change.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.tagName === 'IMG') watchImage(node);
        else node.querySelectorAll('img').forEach(watchImage);
    }))).observe(campaignRoot, {childList:true, subtree:true});
    campaignRoot.querySelectorAll('img').forEach(watchImage);
})();

document.addEventListener("shopify:section:load", () => {
    const s = document.createElement("script");
    s.src = document.querySelector('script[src*="bfcm2026.js"]').src;
    s.onload = () => s.remove();
    document.head.append(s);
}, {
    once: true
});







