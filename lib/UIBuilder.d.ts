declare module UIBuilder
{
    class Component<P> {
        protected props: P;
        constructor(props: P);
        render(): HTMLElement;
    }
    interface Props
    {
        children?: any;
    }
    function createElement<P extends UIBuilder.Props>(type: any, props: P, ...children: any[]): HTMLElement | SVGAElement;
}
declare module UIBuilder
{
    function clone<T>(obj: T): T;
}

declare namespace JSX
{
    interface Element extends Node { }

    interface IntrinsicElements
    {
        // HTML
        a: React.HTMLProps<HTMLAnchorElement>;
        abbr: React.HTMLProps<HTMLElement>;
        address: React.HTMLProps<HTMLElement>;
        area: React.HTMLProps<HTMLAreaElement>;
        article: React.HTMLProps<HTMLElement>;
        aside: React.HTMLProps<HTMLElement>;
        audio: React.HTMLProps<HTMLAudioElement>;
        b: React.HTMLProps<HTMLElement>;
        base: React.HTMLProps<HTMLBaseElement>;
        bdi: React.HTMLProps<HTMLElement>;
        bdo: React.HTMLProps<HTMLElement>;
        big: React.HTMLProps<HTMLElement>;
        blockquote: React.HTMLProps<HTMLElement>;
        body: React.HTMLProps<HTMLBodyElement>;
        br: React.HTMLProps<HTMLBRElement>;
        button: React.HTMLProps<HTMLButtonElement>;
        canvas: React.HTMLProps<HTMLCanvasElement>;
        caption: React.HTMLProps<HTMLElement>;
        cite: React.HTMLProps<HTMLElement>;
        code: React.HTMLProps<HTMLElement>;
        col: React.HTMLProps<HTMLTableColElement>;
        colgroup: React.HTMLProps<HTMLTableColElement>;
        data: React.HTMLProps<HTMLElement>;
        datalist: React.HTMLProps<HTMLDataListElement>;
        dd: React.HTMLProps<HTMLElement>;
        del: React.HTMLProps<HTMLElement>;
        details: React.HTMLProps<HTMLElement>;
        dfn: React.HTMLProps<HTMLElement>;
        dialog: React.HTMLProps<HTMLElement>;
        div: React.HTMLProps<HTMLDivElement>;
        dl: React.HTMLProps<HTMLDListElement>;
        dt: React.HTMLProps<HTMLElement>;
        em: React.HTMLProps<HTMLElement>;
        embed: React.HTMLProps<HTMLEmbedElement>;
        fieldset: React.HTMLProps<HTMLFieldSetElement>;
        figcaption: React.HTMLProps<HTMLElement>;
        figure: React.HTMLProps<HTMLElement>;
        footer: React.HTMLProps<HTMLElement>;
        form: React.HTMLProps<HTMLFormElement>;
        h1: React.HTMLProps<HTMLHeadingElement>;
        h2: React.HTMLProps<HTMLHeadingElement>;
        h3: React.HTMLProps<HTMLHeadingElement>;
        h4: React.HTMLProps<HTMLHeadingElement>;
        h5: React.HTMLProps<HTMLHeadingElement>;
        h6: React.HTMLProps<HTMLHeadingElement>;
        head: React.HTMLProps<HTMLHeadElement>;
        header: React.HTMLProps<HTMLElement>;
        hgroup: React.HTMLProps<HTMLElement>;
        hr: React.HTMLProps<HTMLHRElement>;
        html: React.HTMLProps<HTMLHtmlElement>;
        i: React.HTMLProps<HTMLElement>;
        iframe: React.HTMLProps<HTMLIFrameElement>;
        img: React.HTMLProps<HTMLImageElement>;
        input: React.HTMLProps<HTMLInputElement>;
        ins: React.HTMLProps<HTMLModElement>;
        kbd: React.HTMLProps<HTMLElement>;
        keygen: React.HTMLProps<HTMLElement>;
        label: React.HTMLProps<HTMLLabelElement>;
        legend: React.HTMLProps<HTMLLegendElement>;
        li: React.HTMLProps<HTMLLIElement>;
        link: React.HTMLProps<HTMLLinkElement>;
        main: React.HTMLProps<HTMLElement>;
        map: React.HTMLProps<HTMLMapElement>;
        mark: React.HTMLProps<HTMLElement>;
        menu: React.HTMLProps<HTMLElement>;
        menuitem: React.HTMLProps<HTMLElement>;
        meta: React.HTMLProps<HTMLMetaElement>;
        meter: React.HTMLProps<HTMLElement>;
        nav: React.HTMLProps<HTMLElement>;
        noscript: React.HTMLProps<HTMLElement>;
        object: React.HTMLProps<HTMLObjectElement>;
        ol: React.HTMLProps<HTMLOListElement>;
        optgroup: React.HTMLProps<HTMLOptGroupElement>;
        option: React.HTMLProps<HTMLOptionElement>;
        output: React.HTMLProps<HTMLElement>;
        p: React.HTMLProps<HTMLParagraphElement>;
        param: React.HTMLProps<HTMLParamElement>;
        picture: React.HTMLProps<HTMLElement>;
        pre: React.HTMLProps<HTMLPreElement>;
        progress: React.HTMLProps<HTMLProgressElement>;
        q: React.HTMLProps<HTMLQuoteElement>;
        rp: React.HTMLProps<HTMLElement>;
        rt: React.HTMLProps<HTMLElement>;
        ruby: React.HTMLProps<HTMLElement>;
        s: React.HTMLProps<HTMLElement>;
        samp: React.HTMLProps<HTMLElement>;
        script: React.HTMLProps<HTMLElement>;
        section: React.HTMLProps<HTMLElement>;
        select: React.HTMLProps<HTMLSelectElement>;
        small: React.HTMLProps<HTMLElement>;
        source: React.HTMLProps<HTMLSourceElement>;
        span: React.HTMLProps<HTMLSpanElement>;
        strong: React.HTMLProps<HTMLElement>;
        style: React.HTMLProps<HTMLStyleElement>;
        sub: React.HTMLProps<HTMLElement>;
        summary: React.HTMLProps<HTMLElement>;
        sup: React.HTMLProps<HTMLElement>;
        table: React.HTMLProps<HTMLTableElement>;
        tbody: React.HTMLProps<HTMLTableSectionElement>;
        td: React.HTMLProps<HTMLTableDataCellElement>;
        textarea: React.HTMLProps<HTMLTextAreaElement>;
        tfoot: React.HTMLProps<HTMLTableSectionElement>;
        th: React.HTMLProps<HTMLTableHeaderCellElement>;
        thead: React.HTMLProps<HTMLTableSectionElement>;
        time: React.HTMLProps<HTMLElement>;
        title: React.HTMLProps<HTMLTitleElement>;
        tr: React.HTMLProps<HTMLTableRowElement>;
        track: React.HTMLProps<HTMLTrackElement>;
        u: React.HTMLProps<HTMLElement>;
        ul: React.HTMLProps<HTMLUListElement>;
        "var": React.HTMLProps<HTMLElement>;
        video: React.HTMLProps<HTMLVideoElement>;
        wbr: React.HTMLProps<HTMLElement>;

        // SVG
        svg: React.SVGProps;

        circle: React.SVGProps;
        clipPath: React.SVGProps;
        defs: React.SVGProps;
        desc: React.SVGProps;
        ellipse: React.SVGProps;
        feBlend: React.SVGProps;
        feColorMatrix: React.SVGProps;
        feComponentTransfer: React.SVGProps;
        feComposite: React.SVGProps;
        feConvolveMatrix: React.SVGProps;
        feDiffuseLighting: React.SVGProps;
        feDisplacementMap: React.SVGProps;
        feDistantLight: React.SVGProps;
        feFlood: React.SVGProps;
        feFuncA: React.SVGProps;
        feFuncB: React.SVGProps;
        feFuncG: React.SVGProps;
        feFuncR: React.SVGProps;
        feGaussianBlur: React.SVGProps;
        feImage: React.SVGProps;
        feMerge: React.SVGProps;
        feMergeNode: React.SVGProps;
        feMorphology: React.SVGProps;
        feOffset: React.SVGProps;
        fePointLight: React.SVGProps;
        feSpecularLighting: React.SVGProps;
        feSpotLight: React.SVGProps;
        feTile: React.SVGProps;
        feTurbulence: React.SVGProps;
        filter: React.SVGProps;
        foreignObject: React.SVGProps;
        g: React.SVGProps;
        image: React.SVGProps;
        line: React.SVGProps;
        linearGradient: React.SVGProps;
        marker: React.SVGProps;
        mask: React.SVGProps;
        metadata: React.SVGProps;
        path: React.SVGProps;
        pattern: React.SVGProps;
        polygon: React.SVGProps;
        polyline: React.SVGProps;
        radialGradient: React.SVGProps;
        rect: React.SVGProps;
        stop: React.SVGProps;
        switch: React.SVGProps;
        symbol: React.SVGProps;
        text: React.SVGProps;
        textPath: React.SVGProps;
        tspan: React.SVGProps;
        use: React.SVGProps;
        view: React.SVGProps;
    }
}