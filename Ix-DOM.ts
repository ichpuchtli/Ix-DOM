
/// <reference path="node_modules/@types/ix.js/index.d.ts" />
/// <reference path="CSSProperties.d.ts" />

type IEnumerable<T> = Ix.Enumerable<T>;

namespace Ix.DOM
{
    type IArrayLike<T> = { [index: number]: T, length: number };

    namespace Util
    {
        export function toEnumerable<T>(arrayLike: IArrayLike<T>): IEnumerable<T>
        {
            return Ix.Enumerable.fromArray<T>(arrayLike as T[]);
        }
    }

    export const addClass = <T extends Element>(className: string) => (element : T) => element.classList.add(className);

    export const removeClass = <T extends Element>(className: string) => (element : T) => element.classList.remove(className);

    export const toggleClass = <T extends Element>(className: string) => (element: T) => element.classList.toggle(className);

    export const hasClass = <T extends Element>(className: string) => (element: T) => element.classList.contains(className);

    export const hasAttr = (attributeName: string) => (element: Element) => element.hasAttribute(attributeName);

    export const hasDataAttr = (attributeName: string) => hasAttr(`data-${attributeName}`);

    export function prop<T, K extends keyof T>(element: T, attributeName: K, attributeValue: T[K]) : void
    export function prop<T, K extends keyof T>(element: T, attributeName: K) : T[K]
    export function prop<T, K extends keyof T>(element: T, attributeName: K, attributeValue?: T[K]) : void|T[K]
    {
        if(attributeValue)
        {
            return element[attributeName] = attributeValue;
        }

        return element[attributeName];
    }

    export function attr<T extends string>(attributeName: string) : (element: Element) => T|null
    export function attr(attributeName: string, attributeValue: string|number|boolean) : (element: Element) => void
    export function attr<T extends string>(attributeName: string, attributeValue?: string|number|boolean) : (element: Element) => void
    {
        if(attributeValue)
        {
            return (element: Element) => element.setAttribute(attributeName, attributeValue.toString());
        }

        return  (element: Element) => element.getAttribute(attributeName) as T | null;
    }

    export function attrOrThrow<T extends string>(attributeName: string)
    {
        return (element: Element) =>
        {
            if (element.hasAttribute(attributeName))
            {
                return element.getAttribute(attributeName) as T;
            }

            throw new Error(`Attribute ${attributeName} does not exist on ${element}`);
        };
    }

    export const attrAsNumber = <T extends number>(attributeName: string) => (element: Element) => parseInt(attrOrThrow(attributeName)(element)) as T;

    export const attrAsBool = (attributeName: string) => (element: Element) => attrOrThrow(attributeName)(element).toLowerCase() == "true";

    export const data = <T extends string>(dataAttributeName: string) => attrOrThrow<T>(`data-${dataAttributeName}`);

    export const dataAttrAsNumber = <T extends number>(dataAttributeName: string) => attrAsNumber<T>(`data-${dataAttributeName}`);

    export const dataAttrAsBool = (dataAttributeName: string) => attrAsBool(`data-${dataAttributeName}`);

    export function style<T extends SVGElement|HTMLElement>(property: keyof CSSStyleDeclaration, value: string | number): (element: T) => T
    export function style<T extends SVGElement|HTMLElement>(property: CSSProperties): (element: T) => T
    export function style<T extends SVGElement|HTMLElement>(property: (keyof CSSStyleDeclaration) | CSSProperties, value?: string | number)
    {
        let props = property as string | CSSProperties;

        return function (element: T)
        {
            if (typeof props === "string")
            {
                (element as HTMLElement).style[props as any] = value!.toString();
            }
            else
            {
                for (let prop in props)
                {
                    // Cast to HTMLElement as SVGElement has style property as well just not standard
                    (element as HTMLElement).style[prop as any] = props[prop].toString();
                }
            }

            return element;
        }
    }

    export const parents = (element: Node) => Ix.Enumerable.create(() => 
        Ix.Enumerator.create(
            () => (element = element.parentNode as Node) !== null,
            () => element,
            () => { }
    ));

    export const setTextContent = <T extends HTMLElement | SVGElement>(element: T) => (text: string) => element.textContent = text;

    //TODO XSS.js
    export function setInnerHtml<T extends HTMLElement | SVGElement>(element: T)
    {
        return function (html: string | HTMLElement | SVGElement)
        {
            if (typeof html === 'string')
            {
                element.innerHTML = html;
            }
            else
            {
                while (element.lastChild)
                {
                    element.removeChild(element.lastChild);
                }
                element.appendChild(html);
            }
        }
    }

    export function children<T extends SVGElement>(element: T): IEnumerable<T>
    export function children<T extends HTMLElement>(element: HTMLElement): IEnumerable<T>
    export function children<T extends HTMLElement | SVGElement>(element: HTMLElement | SVGElement)
    {
        return Util.toEnumerable<T>(element.children as IArrayLike<any>);
    }

    export const remove = <T extends HTMLElement | SVGElement>(element: T) => (element.parentNode as Node).removeChild(element);

    export const append = <T extends HTMLElement | SVGElement>(parent: Element) => (element: T) => parent.appendChild(element);

    export const hide = style('display', 'none');

    export const show = style('display', 'block');

    export function value<T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(element: T) : string
    export function value<T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(element: T, setValue: string | number): string
    export function value<T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(element: T, setValue?: string | number): string
    {
        return setValue ? element.value = setValue.toString() : element.value;
    }

    export function valueAsNumber<T extends HTMLInputElement>(element: T) : number
    export function valueAsNumber<T extends HTMLInputElement>(element: T, setValue: number): number
    export function valueAsNumber<T extends HTMLInputElement>(element: T, setValue?: number)
    {
        return setValue ? element.valueAsNumber = setValue : element.valueAsNumber;
    }

    export const elementById = <T extends HTMLElement | SVGElement>(id: string) => document.getElementById(id) as T|null;

    export function elementByIdOrThrow<T extends HTMLElement | SVGElement>(id: string): T
    {
        var element = document.getElementById(id);

        if (element)
        {
            return element as any as T;
        }

        throw new Error(`Element #${id} does not exist.`);
    }

    export function querySelector<T extends HTMLElement | SVGElement>(selector: string, root: Element | HTMLDocument = document): T | null
    {
        return root.querySelector(selector) as any as T;
    }

    export function querySelectorOrThrow<T extends HTMLElement | SVGElement>(selector: string, root: Element | HTMLDocument = document): T
    {
        var element = root.querySelector(selector);

        if (element)
        {
            return element as any as T;
        }

        throw new Error(`No match for ${selector} under ${root}`);
    }

    export function querySelectorAllOrThrow<T extends HTMLElement | SVGElement>(selector: string, root: Element | HTMLDocument = document): IEnumerable<T>
    {
        const elements = root.querySelectorAll(selector);

        if (elements.length === 0)
        {
            throw new Error(`No match for ${selector} under ${root}`);
        }

        return Util.toEnumerable<T>(elements as any);
    }

    export function querySelectorAll<T extends HTMLElement | SVGElement>(selector: string, root: Element | HTMLDocument = document): IEnumerable<T>
    {
        return Util.toEnumerable<T>(root.querySelectorAll(selector) as any);
    }

    export const ready = (func: (...args: any[]) => any) => document.readyState !== 'loading' ? func() : document.addEventListener('DOMContentLoaded', func);
}
