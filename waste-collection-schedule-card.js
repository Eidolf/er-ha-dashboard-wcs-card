function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}function e(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,o)},c=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:u,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,f=globalThis,_=f.trustedTypes,m=_?_.emptyScript:"",y=f.reactiveElementPolyfillSupport,b=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!l(t,e),v={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...u(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(s)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),o=i.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??w)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,y?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,C=t=>t,S=A.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+k,z=`<${N}>`,P=document,O=()=>P.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,M="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,L=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,W=/"/g,V=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),F=new WeakMap,K=P.createTreeWalker(P,129);function J(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===U?"!--"===c[1]?r=H:void 0!==c[1]?r=R:void 0!==c[2]?(V.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=L):void 0!==c[3]&&(r=L):r===L?">"===c[0]?(r=o??U,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?L:'"'===c[3]?W:j):r===W||r===j?r=L:r===H||r===R?r=U:(r=L,o=void 0);const h=r===L&&t[e+1].startsWith("/>")?" ":"";n+=r===U?i+z:l>=0?(s.push(a),i.slice(0,l)+T+i.slice(l)+k+h):i+k+(-2===l?e:h)}return[J(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=Z.createElement(c,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(T)){const e=l[n++],i=s.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?it:"?"===r[1]?st:"@"===r[1]?ot:et}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(V.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),K.nextNode(),a.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===N)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===q)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=I(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);K.currentNode=s;let o=K.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new tt(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=K.nextNode(),n++)}return K.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),I(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Z(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new tt(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=X(this,t,e,0),n=!I(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=X(this,s[i+r],e,r),a===q&&(a=this._$AH[r]),n||=!I(a)||a!==this._$AH[r],a===G?t=G:t!==G&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class ot extends et{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??G)===q)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(Z,tt),(A.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;class ct extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new tt(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ct._$litElement$=!0,ct.finalized=!0,at.litElementHydrateSupport?.({LitElement:ct});const lt=at.litElementPolyfillSupport;lt?.({LitElement:ct}),(at.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:w},ut=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return pt({...t,state:!0,attribute:!1})}const ft=a`
  :host {
    --wcs-accent-color: var(--primary-color, #03a9f4);
    --wcs-text-primary: var(--primary-text-color, #e1e1e1);
    --wcs-text-secondary: var(--secondary-text-color, #9e9e9e);
    --wcs-card-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
    --wcs-card-border-radius: var(--ha-card-border-radius, 16px);
    --wcs-card-border-width: var(--ha-card-border-width, 1px);
    --wcs-card-border-color: var(--ha-card-border-color, rgba(255, 255, 255, 0.1));
    display: block;
  }

  .wcs-card {
    background: var(--wcs-card-bg);
    border-radius: var(--wcs-card-border-radius);
    border: var(--wcs-card-border-width) solid var(--wcs-card-border-color);
    padding: 16px;
    box-shadow: var(--ha-card-box-shadow, none);
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }

  .wcs-card.layout-grid {
    padding: 12px;
  }

  .wcs-header {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--wcs-text-primary);
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }

  .wcs-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .wcs-container.layout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 10px;
  }

  /* Waste Item Styling */
  .wcs-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    cursor: pointer;
  }

  .wcs-item:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
  }

  /* Grid specific item styles */
  .wcs-item.layout-grid {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 16px 8px;
    min-height: 120px;
    gap: 8px;
  }

  .wcs-item.layout-row {
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    background: transparent;
  }

  .wcs-item.layout-row:hover {
    background: rgba(255, 255, 255, 0.03);
    transform: none;
  }

  /* Icon wrapper */
  .wcs-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .wcs-icon-wrapper.layout-grid {
    margin-bottom: 4px;
  }

  /* Content wrapper */
  .wcs-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
  }

  .wcs-content.layout-grid {
    margin-left: 0;
    align-items: center;
    width: 100%;
  }

  .wcs-content.layout-row {
    margin-left: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  /* Typographies */
  .wcs-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--wcs-text-primary);
    line-height: 1.2;
  }

  .wcs-name.layout-grid {
    font-size: 0.9rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .wcs-details {
    font-size: 0.85rem;
    color: var(--wcs-text-secondary);
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }

  .wcs-details.layout-grid {
    justify-content: center;
    text-align: center;
    margin-top: 2px;
  }

  .wcs-details.layout-row {
    margin-top: 0;
  }

  /* Days badge */
  .wcs-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* State Alerts */
  .wcs-item.due-today {
    background: rgba(var(--rgb-due-color, 244, 67, 54), 0.08);
    border-color: rgba(var(--rgb-due-color, 244, 67, 54), 0.3);
    animation: wcs-pulse-today 2s infinite ease-in-out;
  }
  
  .wcs-item.due-tomorrow {
    background: rgba(var(--rgb-due-1-color, 255, 152, 0), 0.06);
    border-color: rgba(var(--rgb-due-1-color, 255, 152, 0), 0.25);
  }

  .wcs-badge.today {
    background: rgb(var(--rgb-due-color, 244, 67, 54));
    color: #ffffff;
  }

  .wcs-badge.tomorrow {
    background: rgb(var(--rgb-due-1-color, 255, 152, 0));
    color: #ffffff;
  }

  .wcs-badge.upcoming {
    background: rgba(255, 255, 255, 0.08);
    color: var(--wcs-text-secondary);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Animations */
  @keyframes wcs-pulse-today {
    0% {
      box-shadow: 0 0 0 0 rgba(var(--rgb-due-color, 244, 67, 54), 0.3);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(var(--rgb-due-color, 244, 67, 54), 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(var(--rgb-due-color, 244, 67, 54), 0);
    }
  }

  /* Responsive tweaks */
  @media (max-width: 350px) {
    .wcs-container.layout-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
`,_t={en:{"state.today":"Today","state.tomorrow":"Tomorrow","state.in_days":"In {days} days","state.1_day":"In 1 day","state.days":"days","state.day":"day","editor.entity":"Entity (Required)","editor.entities":"Entities (Optional, list)","editor.title":"Title","editor.layout":"Layout Style","editor.layout_card":"Standard Card","editor.layout_row":"Compact Row","editor.layout_grid":"Grid Layout","editor.hide_before":"Hide entire card until X days before (Default: -1 / disabled)","editor.hide_date":"Hide Date Text","editor.hide_days":"Hide Number of Days","editor.hide_dow":"Hide Day of the Week","editor.hide_icon":"Hide Icon","editor.hide_on_click":"Dismiss on click (when due today/tomorrow)","editor.hide_on_today":"Hide on today (e.g. if collected early in morning)","editor.hide_title":"Hide Title","editor.icon_size":"Icon Size (e.g., 30px)","editor.due_color":"Due Today Color (e.g., red or #ff0000)","editor.due_1_color":"Due Tomorrow Color (e.g., orange)","editor.icon_color":"Standard Icon Color (e.g., var(--primary-text-color))","editor.invalid_json":"Invalid JSON format","editor.max_items":"Maximum items to display (Default: 5)","editor.next_only":"Only show the next upcoming collection per waste type"},de:{"state.today":"Heute","state.tomorrow":"Morgen","state.in_days":"In {days} Tagen","state.1_day":"In 1 Tag","state.days":"Tage","state.day":"Tag","editor.entity":"Entität (Erforderlich)","editor.entities":"Entitäten (Optional, Liste)","editor.title":"Titel","editor.layout":"Layout-Stil","editor.layout_card":"Standard-Karte","editor.layout_row":"Kompakte Zeile","editor.layout_grid":"Raster-Layout (Grid)","editor.hide_before":"Karte ausblenden bis X Tage vor Termin (Standard: -1 / inaktiv)","editor.hide_date":"Datum ausblenden","editor.hide_days":"Tage ausblenden","editor.hide_dow":"Wochentag ausblenden","editor.hide_icon":"Icon ausblenden","editor.hide_on_click":"Per Klick ausblenden (wenn heute/morgen fällig)","editor.hide_on_today":"Heute ausblenden (z.B. bei früher Abholung)","editor.hide_title":"Titel ausblenden","editor.icon_size":"Icon-Größe (z.B. 30px)","editor.due_color":"Farbe am Abholtag (z.B. red oder #ff0000)","editor.due_1_color":"Farbe am Vortag (z.B. orange)","editor.icon_color":"Standard Icon-Farbe (z.B. var(--primary-text-color))","editor.invalid_json":"Ungültiges JSON-Format","editor.max_items":"Maximale Anzahl an Terminen (Standard: 5)","editor.next_only":"Nur den nächsten Termin pro Müllsorte anzeigen"}};function mt(t,e="",i="",s="en"){const o=s.split("-")[0];let n=(_t[o]||_t.en)[t]||_t.en[t]||t;return""!==e&&""!==i&&(n=n.replace(e,i)),n}function yt(t){return t.replace(/Waste Collection Schedule\s*/gi,"").trim()}function bt(t){if(!t)return null;let e=t.match(/(\d{4})-(\d{2})-(\d{2})/);return e?new Date(Number(e[1]),Number(e[2])-1,Number(e[3])):(e=t.match(/(\d{2})\.(\d{2})\.(\d{4})/),e?new Date(Number(e[3]),Number(e[2])-1,Number(e[1])):null)}const $t=[{value:"mdi:leaf",label:"Leaf (Bio / Garden)"},{value:"mdi:trash-can",label:"Trash Can (Restmüll)"},{value:"mdi:package-variant",label:"Package (Papier)"},{value:"mdi:recycle",label:"Recycle (Gelber Sack)"},{value:"mdi:glass-fragile",label:"Glass (Glas)"},{value:"mdi:sofa",label:"Sofa (Sperrmüll)"},{value:"mdi:biohazard",label:"Biohazard (Schadstoff)"},{value:"mdi:pine-tree",label:"Pine Tree (Weihnachtsbaum)"},{value:"mdi:trash-can-outline",label:"Default outline"}];let wt=class extends ct{setConfig(t){this._config=t}get _title(){return this._config?.title||""}get _layout(){return this._config?.layout||"card"}get _hide_before(){return this._config?.hide_before??-1}get _due_color(){return this._config?.due_color||"#f44336"}get _due_1_color(){return this._config?.due_1_color||"#ff9800"}get _icon_size(){return this._config?.icon_size||"30px"}get _max_items(){return this._config?.max_items??5}get _next_only(){return!1!==this._config?.next_only}get _entitiesList(){const t=[];this._config?.entity&&t.push(this._config.entity),this._config?.entities&&Array.isArray(this._config.entities)&&t.push(...this._config.entities);const e=[];for(const i of t)""===i?e.push(i):e.includes(i)||e.push(i);return e}_getDetectedWasteTypes(){if(!this.hass||!this._config)return[];const t=new Set,e=this._entitiesList;for(const i of e){const e=this.hass.states[i];if(!e)continue;const s=e.attributes;if(s.wastes&&Array.isArray(s.wastes))for(const e of s.wastes)e.type&&t.add(yt(e.type));for(const[e,i]of Object.entries(s))bt(e)&&t.add(yt(String(i)));const o=yt(s.friendly_name||i.split(".").pop()||"");o&&t.add(o)}return Array.from(t).filter(Boolean)}_getWasteColor(t){const e=this._config?.custom_colors||{};if(e[t])return e[t];const i=t.toLowerCase();return i.includes("bio")||i.includes("organ")||i.includes("braun")||i.includes("garten")?"#4caf50":i.includes("papier")||i.includes("pappe")||i.includes("blau")?"#2196f3":i.includes("gelb")||i.includes("plastik")||i.includes("recycle")||i.includes("wertstoff")?"#fbc02d":i.includes("rest")||i.includes("hausmüll")||i.includes("grau")||i.includes("schwarz")?"#707070":i.includes("glas")||i.includes("flasche")?"#00bcd4":"#e1e1e1"}_getWasteIcon(t){const e=this._config?.custom_icons||{};if(e[t])return e[t];const i=t.toLowerCase();return i.includes("bio")||i.includes("organ")||i.includes("braun")||i.includes("garten")?"mdi:leaf":i.includes("papier")||i.includes("pappe")||i.includes("blau")?"mdi:package-variant":i.includes("gelb")||i.includes("plastik")||i.includes("recycle")||i.includes("wertstoff")?"mdi:recycle":i.includes("rest")||i.includes("hausmüll")||i.includes("grau")||i.includes("schwarz")?"mdi:trash-can":i.includes("glas")||i.includes("flasche")?"mdi:glass-fragile":"mdi:trash-can-outline"}render(){if(!this.hass)return B``;const t=this.hass.language||"en",e=this._getDetectedWasteTypes(),i=this._entitiesList;return B`
      <div class="card-config">
        <!-- Multiple Entities Picker List -->
        <div class="option">
          <div class="section-title">Müllsensoren (Entitäten)</div>
          <div class="entities-list">
            ${i.map((t,e)=>B`
              <div class="entity-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${t}"
                  @value-changed="${t=>this._entityChanged(e,t)}"
                  allow-custom-entity
                ></ha-entity-picker>
                <button class="delete-btn" @click="${()=>this._removeEntity(e)}">
                  <ha-icon icon="mdi:delete"></ha-icon>
                </button>
              </div>
            `)}
          </div>
          <button class="add-btn" @click="${this._addEntity}">
            <ha-icon icon="mdi:plus"></ha-icon> Sensor hinzufügen
          </button>
        </div>

        <!-- Card Title -->
        <div class="option">
          <ha-textfield
            label="${mt("editor.title","","",t)}"
            .value="${this._title}"
            .configValue="${"title"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Layout Style -->
        <div class="section-title">${mt("editor.layout","","",t)}</div>
        <div class="option">
          <ha-select
            .value="${this._layout}"
            .configValue="${"layout"}"
            @change="${this._valueChanged}"
            @closed="${t=>t.stopPropagation()}"
          >
            <mwc-list-item value="card">${mt("editor.layout_card","","",t)}</mwc-list-item>
            <mwc-list-item value="row">${mt("editor.layout_row","","",t)}</mwc-list-item>
            <mwc-list-item value="grid">${mt("editor.layout_grid","","",t)}</mwc-list-item>
          </ha-select>
        </div>

        <!-- Limit / Max Items -->
        <div class="option">
          <ha-textfield
            label="${mt("editor.max_items","","",t)}"
            type="number"
            .value="${String(this._max_items)}"
            .configValue="${"max_items"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Threshold to Hide -->
        <div class="option">
          <ha-textfield
            label="${mt("editor.hide_before","","",t)}"
            type="number"
            .value="${String(this._hide_before)}"
            .configValue="${"hide_before"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Style customization headers -->
        <div class="section-title">Farben für Termine & Icons</div>

        <!-- Due colors -->
        <div class="color-row">
          <div class="color-picker-wrapper">
            <span class="color-label">Heute fällig:</span>
            <input 
              type="color" 
              .value="${this._due_color}" 
              .configValue="${"due_color"}"
              @input="${this._valueChanged}"
            />
          </div>
          <div class="color-picker-wrapper">
            <span class="color-label">Morgen fällig:</span>
            <input 
              type="color" 
              .value="${this._due_1_color}" 
              .configValue="${"due_1_color"}"
              @input="${this._valueChanged}"
            />
          </div>
        </div>

        <div class="option">
          <ha-textfield
            label="${mt("editor.icon_size","","",t)}"
            .value="${this._icon_size}"
            .configValue="${"icon_size"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Detected Waste Types Custom Style Editor -->
        ${e.length>0?B`
              <div class="section-title">Müllsorten anpassen</div>
              <div class="waste-customizer-list">
                ${e.map(t=>this._renderWasteCustomizerRow(t))}
              </div>
            `:""}

        <!-- General switches -->
        <div class="section-title">Anzeige-Optionen</div>
        <div class="toggles">
          <ha-formfield .label="${mt("editor.hide_title","","",t)}">
            <ha-switch
              .checked="${!this._config?.hide_title}"
              .configValue="${"hide_title"}"
              .invert="${!0}"
              @change="${this._toggleInvertedChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${mt("editor.hide_date","","",t)}">
            <ha-switch
              .checked="${!!this._config?.hide_date}"
              .configValue="${"hide_date"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${mt("editor.hide_days","","",t)}">
            <ha-switch
              .checked="${!!this._config?.hide_days}"
              .configValue="${"hide_days"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${mt("editor.hide_icon","","",t)}">
            <ha-switch
              .checked="${!!this._config?.hide_icon}"
              .configValue="${"hide_icon"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${mt("editor.hide_on_click","","",t)}">
            <ha-switch
              .checked="${!1!==this._config?.hide_on_click}"
              .configValue="${"hide_on_click"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${mt("editor.hide_on_today","","",t)}">
            <ha-switch
              .checked="${!!this._config?.hide_on_today}"
              .configValue="${"hide_on_today"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${mt("editor.next_only","","",t)}">
            <ha-switch
              .checked="${this._next_only}"
              .configValue="${"next_only"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `}_renderWasteCustomizerRow(t){const e=this._getWasteIcon(t),i=this._getWasteColor(t),s=!$t.some(t=>t.value===e);return B`
      <div class="waste-row">
        <div class="waste-type-header">${t}</div>
        <div class="waste-inputs">
          <div class="color-picker-box">
            <input 
              type="color" 
              .value="${i}" 
              @input="${e=>this._customStyleChanged(t,"color",e.target.value)}"
            />
          </div>

          <div class="icon-selector">
            <select 
              .value="${s?"custom":e}"
              @change="${e=>this._customStyleChanged(t,"icon-select",e.target.value)}"
            >
              ${$t.map(t=>B`<option value="${t.value}">${t.label}</option>`)}
              <option value="custom">Custom Icon...</option>
            </select>
          </div>

          <div class="custom-icon-input">
            <input 
              type="text" 
              placeholder="mdi:trash-can" 
              .value="${e}"
              @input="${e=>this._customStyleChanged(t,"icon-text",e.target.value)}"
            />
          </div>
        </div>
      </div>
    `}_customStyleChanged(t,e,i){if(this._config){if("color"===e){const e={...this._config.custom_colors||{}};e[t]=i,this._config={...this._config,custom_colors:e}}else if("icon-select"===e){if("custom"!==i){const e={...this._config.custom_icons||{}};e[t]=i,this._config={...this._config,custom_icons:e}}}else if("icon-text"===e){const e={...this._config.custom_icons||{}};e[t]=i,this._config={...this._config,custom_icons:e}}this._fireConfigChanged()}}_entityChanged(t,e){if(!this._config)return;const i=e.detail.value,s=[...this._entitiesList];i?s[t]=i:s.splice(t,1),this._updateEntities(s)}_addEntity(){const t=[...this._entitiesList,""];this._updateEntities(t)}_removeEntity(t){const e=[...this._entitiesList];e.splice(t,1),this._updateEntities(e)}_updateEntities(t){this._config={...this._config,entity:void 0,entities:t.length>0?t:void 0},this._fireConfigChanged()}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configValue||e.getAttribute("configValue");if(i){let t=e.value;"max_items"!==i&&"hide_before"!==i||(t=Number(t),isNaN(t)&&(t=void 0)),this._config={...this._config,[i]:t},this._fireConfigChanged()}}_toggleChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configValue||e.getAttribute("configValue");i&&(this._config={...this._config,[i]:e.checked},this._fireConfigChanged())}_toggleInvertedChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configValue||e.getAttribute("configValue");i&&(this._config={...this._config,[i]:!e.checked},this._fireConfigChanged())}_fireConfigChanged(){const t=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(t)}static{this.styles=a`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .option {
      display: flex;
      flex-direction: column;
    }
    .section-title {
      font-weight: bold;
      font-size: 1.1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 4px;
      margin-top: 8px;
    }
    .entities-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 8px;
    }
    .entity-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .entity-row ha-entity-picker {
      flex: 1;
    }
    .delete-btn, .add-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--primary-text-color, #fff);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      transition: background 0.2s;
    }
    .delete-btn:hover {
      background: rgba(244, 67, 54, 0.2);
      border-color: rgba(244, 67, 54, 0.4);
    }
    .add-btn {
      padding: 8px 16px;
      width: fit-content;
      gap: 6px;
    }
    .add-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .color-row {
      display: flex;
      gap: 16px;
    }
    .color-picker-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
    }
    .color-picker-wrapper input[type="color"] {
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      background: none;
    }
    .color-label {
      font-size: 0.95rem;
    }
    .waste-customizer-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .waste-row {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.03);
      padding: 10px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .waste-type-header {
      font-weight: 600;
      margin-bottom: 8px;
    }
    .waste-inputs {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .color-picker-box input[type="color"] {
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 4px;
      cursor: pointer;
      background: none;
    }
    .icon-selector select {
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #fff);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      padding: 6px;
      min-width: 140px;
    }
    .custom-icon-input input {
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #fff);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      padding: 6px;
      width: 130px;
    }
    ha-select, ha-textfield, ha-textarea, ha-entity-picker {
      width: 100%;
    }
    .toggles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    ha-formfield {
      display: flex;
      align-items: center;
    }
  `}};function vt(t){let e=t.trim();if(e.startsWith("var("))return"244, 67, 54";e=e.replace("#",""),3===e.length&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);const i=parseInt(e,16);return isNaN(i)?"244, 67, 54":`${i>>16&255}, ${i>>8&255}, ${255&i}`}function xt(t){if(!t)return null;let e=t.match(/(\d{4})-(\d{2})-(\d{2})/);return e?new Date(Number(e[1]),Number(e[2])-1,Number(e[3])):(e=t.match(/(\d{2})\.(\d{2})\.(\d{4})/),e?new Date(Number(e[3]),Number(e[2])-1,Number(e[1])):(e=t.match(/(\d{2})\/(\d{2})\/(\d{4})/),e?new Date(Number(e[3]),Number(e[1])-1,Number(e[2])):null))}function At(t,e){const i=new Date(t.getFullYear(),t.getMonth(),t.getDate()),s=new Date(e.getFullYear(),e.getMonth(),e.getDate()),o=i.getTime()-s.getTime();return Math.ceil(o/864e5)}function Ct(t){return t.replace(/Waste Collection Schedule\s*/gi,"").trim()}t([pt({attribute:!1}),e("design:type",Object)],wt.prototype,"hass",void 0),t([gt(),e("design:type",Object)],wt.prototype,"_config",void 0),wt=t([dt("waste-collection-schedule-card-editor")],wt);let St=class extends ct{static get styles(){return ft}static getConfigElement(){return document.createElement("waste-collection-schedule-card-editor")}static getStubConfig(){return{entity:"",title:"Müllabfuhr",layout:"card",hide_before:-1}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={layout:"card",hide_before:-1,hide_date:!1,hide_days:!1,hide_dow:!0,hide_icon:!1,hide_on_click:!0,hide_on_today:!1,hide_title:!1,due_color:"#f44336",due_1_color:"#ff9800",icon_color:"var(--primary-text-color)",next_only:!0,max_items:5,...t}}shouldUpdate(t){if(t.has("config"))return!0;const e=t.get("hass");if(e){const t=this._getEntities();for(const i of t)if(e.states[i]!==this.hass.states[i])return!0;return!1}return!0}_getEntities(){const t=[];return this.config.entity&&t.push(this.config.entity),this.config.entities&&Array.isArray(this.config.entities)&&t.push(...this.config.entities),[...new Set(t)]}_getWasteIcon(t){if(this.config.custom_icons){const e=t.toLowerCase();for(const[t,i]of Object.entries(this.config.custom_icons))if(e.includes(t.toLowerCase()))return i}const e=t.toLowerCase();return e.includes("bio")||e.includes("organ")||e.includes("braun")||e.includes("garten")?"mdi:leaf":e.includes("papier")||e.includes("pappe")||e.includes("blau")?"mdi:package-variant":e.includes("gelb")||e.includes("plastik")||e.includes("recycle")||e.includes("wertstoff")?"mdi:recycle":e.includes("rest")||e.includes("hausmüll")||e.includes("grau")||e.includes("schwarz")?"mdi:trash-can":e.includes("glas")||e.includes("flasche")?"mdi:glass-fragile":e.includes("schadstoff")||e.includes("gift")||e.includes("chem")?"mdi:biohazard":e.includes("sperr")?"mdi:sofa":e.includes("tanne")||e.includes("baum")||e.includes("weihnacht")?"mdi:pine-tree":"mdi:trash-can-outline"}_getWasteColor(t){if(this.config.custom_colors){const e=t.toLowerCase();for(const[t,i]of Object.entries(this.config.custom_colors))if(e.includes(t.toLowerCase()))return i}const e=t.toLowerCase();return e.includes("bio")||e.includes("organ")||e.includes("braun")||e.includes("garten")?"#4caf50":e.includes("papier")||e.includes("pappe")||e.includes("blau")?"#2196f3":e.includes("gelb")||e.includes("plastik")||e.includes("recycle")||e.includes("wertstoff")?"#fbc02d":e.includes("rest")||e.includes("hausmüll")||e.includes("grau")||e.includes("schwarz")?"#707070":e.includes("glas")||e.includes("flasche")?"#00bcd4":e.includes("schadstoff")||e.includes("gift")||e.includes("chem")?"#9c27b0":e.includes("sperr")?"#795548":e.includes("tanne")||e.includes("baum")||e.includes("weihnacht")?"#009688":this.config.icon_color||"var(--primary-text-color)"}_parseEntities(){const t=[],e=this._getEntities(),i=new Date;for(const s of e){const e=this.hass.states[s];if(!e)continue;const o=e.attributes,n=Ct(o.friendly_name||s.split(".").pop()||"Müll");let r=!1;if(o.wastes&&Array.isArray(o.wastes))for(const e of o.wastes){const i=Number(e.daysTo);if(isNaN(i))continue;const o=e.date,a=Ct(e.type||n),c=0===i,l=1===i,d=`wcs_ack_${s}_${a}_${o}`,h="true"===localStorage.getItem(d);t.push({entityId:s,friendlyName:a,daysTo:i,dateText:o,types:[a],icon:this._getWasteIcon(a),color:this._getWasteColor(a),isToday:c,isTomorrow:l,isAcknowledged:h}),r=!0}for(const[e,n]of Object.entries(o)){const o=xt(e);if(o){const a=At(o,i);if(a<0)continue;const c=Ct(String(n)),l=e,d=0===a,h=1===a,u=`wcs_ack_${s}_${c}_${l}`,p="true"===localStorage.getItem(u);t.some(t=>t.entityId===s&&t.friendlyName===c&&t.dateText===l)||(t.push({entityId:s,friendlyName:c,daysTo:a,dateText:l,types:[c],icon:this._getWasteIcon(c),color:this._getWasteColor(c),isToday:d,isTomorrow:h,isAcknowledged:p}),r=!0)}}if(!r){let r=Number(e.state),a=o.dateText||"",c=n;if(isNaN(r)){const t=xt(e.state);t&&(r=At(t,i),a=e.state.replace(/^on\s+\w+,\s+/i,""))}if(!isNaN(r)&&r>=0){const e=0===r,i=1===r,o=`wcs_ack_${s}_${c}_${a}`,n="true"===localStorage.getItem(o);t.push({entityId:s,friendlyName:c,daysTo:r,dateText:a,types:[c],icon:this._getWasteIcon(c),color:this._getWasteColor(c),isToday:e,isTomorrow:i,isAcknowledged:n})}}}let s=t.sort((t,e)=>t.daysTo-e.daysTo);if(!1!==this.config.next_only){const t=new Set;s=s.filter(e=>{const i=e.friendlyName.toLowerCase();return!t.has(i)&&(t.add(i),!0)})}const o=Number(this.config.max_items??5);return!isNaN(o)&&o>0&&(s=s.slice(0,o)),s}_acknowledge(t){if(!this.config.hide_on_click)return;if(!t.isToday&&!t.isTomorrow)return;const e=`wcs_ack_${t.entityId}_${t.types[0]||t.friendlyName}_${t.dateText}`;localStorage.setItem(e,"true"),this.requestUpdate()}render(){if(!this.hass)return null;const t=this._getEntities().filter(Boolean);let e=this._parseEntities();const i=this.config.language||this.hass.language||"en",s=0===t.length;s&&(e=[{entityId:"stub.bio",friendlyName:"Biotonne",daysTo:0,dateText:(new Date).toLocaleDateString(i),types:["Bio"],icon:"mdi:leaf",color:"#4caf50",isToday:!0,isTomorrow:!1,isAcknowledged:!1},{entityId:"stub.paper",friendlyName:"Altpapier",daysTo:1,dateText:new Date(Date.now()+864e5).toLocaleDateString(i),types:["Papier"],icon:"mdi:package-variant",color:"#2196f3",isToday:!1,isTomorrow:!0,isAcknowledged:!1},{entityId:"stub.rest",friendlyName:"Restmüll",daysTo:5,dateText:new Date(Date.now()+432e6).toLocaleDateString(i),types:["Restmüll"],icon:"mdi:trash-can",color:"#707070",isToday:!1,isTomorrow:!1,isAcknowledged:!1}]);const o=s?e:e.filter(t=>!t.isAcknowledged&&((!this.config.hide_on_today||!t.isToday)&&!(void 0!==this.config.hide_before&&this.config.hide_before>-1&&t.daysTo>this.config.hide_before)));if(0===o.length)return B``;const n=this.config.due_color||"#f44336",r=this.config.due_1_color||"#ff9800";return B`
      <div 
        class="wcs-card ${this.config.layout?`layout-${this.config.layout}`:""}"
        style="
          --rgb-due-color: ${vt(n)};
          --rgb-due-1-color: ${vt(r)};
        "
      >
        ${!this.config.hide_title&&this.config.title?B`
              <div class="wcs-header" style="${this.config.title_size?`font-size: ${this.config.title_size};`:""}">
                ${this.config.title}
              </div>
            `:""}

        <div class="wcs-container ${this.config.layout?`layout-${this.config.layout}`:""}">
          ${o.map(t=>this._renderItem(t,i))}
        </div>
      </div>
    `}_renderItem(t,e){let i="";i=t.isToday?mt("state.today","","",e):t.isTomorrow?mt("state.tomorrow","","",e):1===t.daysTo?mt("state.1_day","","",e):mt("state.in_days","{days}",String(t.daysTo),e);let s=t.color;t.isToday&&this.config.due_color?s=this.config.due_color:t.isTomorrow&&this.config.due_1_color&&(s=this.config.due_1_color);const o=["wcs-item",this.config.layout?`layout-${this.config.layout}`:"",t.isToday?"due-today":"",t.isTomorrow?"due-tomorrow":""].filter(Boolean).join(" ");return B`
      <div 
        class="${o}"
        @click="${()=>this._acknowledge(t)}"
      >
        ${this.config.hide_icon?"":B`
              <div class="wcs-icon-wrapper ${this.config.layout?`layout-${this.config.layout}`:""}">
                <ha-icon
                  icon="${t.icon}"
                  style="
                    color: ${s};
                    --mdc-icon-size: ${this.config.icon_size||"30px"};
                    width: ${this.config.icon_size||"30px"};
                    height: ${this.config.icon_size||"30px"};
                  "
                ></ha-icon>
              </div>
            `}

        <div class="wcs-content ${this.config.layout?`layout-${this.config.layout}`:""}">
          <div 
            class="wcs-name ${this.config.layout?`layout-${this.config.layout}`:""}"
            style="${this.config.title_size?`font-size: ${this.config.title_size};`:""}"
          >
            ${t.friendlyName}
          </div>
          
          <div 
            class="wcs-details ${this.config.layout?`layout-${this.config.layout}`:""}"
            style="${this.config.details_size?`font-size: ${this.config.details_size};`:""}"
          >
            ${!this.config.hide_date&&t.dateText?B`<span class="wcs-date">${t.dateText}</span>`:""}
            
            ${this.config.hide_days?"":B`
                  <span class="wcs-badge ${t.isToday?"today":t.isTomorrow?"tomorrow":"upcoming"}">
                    ${i}
                  </span>
                `}
          </div>
        </div>
      </div>
    `}};t([pt({attribute:!1}),e("design:type",Object)],St.prototype,"hass",void 0),t([gt(),e("design:type",Object)],St.prototype,"config",void 0),St=t([dt("waste-collection-schedule-card")],St),window.customCards=window.customCards||[],window.customCards.push({type:"waste-collection-schedule-card",name:"Waste Collection Schedule Card",description:"A modern Lovelace card for Home Assistant waste collection schedules.",preview:!0});export{St as WasteCollectionScheduleCard};
