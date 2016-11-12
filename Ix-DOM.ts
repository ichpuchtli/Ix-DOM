
/// <reference path="node_modules/@types/ix.js/index.d.ts" />
/// <reference path="CSSProperties.d.ts" />

type IEnumerable<T> = Ix.Enumerable<T>;

namespace Ix.Util
{
    export function toArray<T>(arrayLike: { [index: number]: T, length: number }): T[]
    {
        return Array.prototype.slice.call(arrayLike);
    }

    export function toEnumerable<T>(arrayLike: { [index: number]: T, length: number }): IEnumerable<T>
    {
        return Ix.Enumerable.fromArray<T>(arrayLike as T[]);
    }

    export function coerceToArray<T>(obj: T | T[])
    {
        return obj instanceof Array ? obj : [obj];
    }

    export function coerceToEnumerable<T>(obj: T | T[] | IEnumerable<T>)
    {
        return obj instanceof Ix.Enumerable ? obj : toEnumerable<T>(coerceToArray<T>(obj));
    }

    export function coerceAndForEach<T>(elements: T | T[] | IEnumerable<T>, func: (element: T) => any)
    {
        var elementsArray = coerceToEnumerable<T>(elements);

        elementsArray.forEach(func);

        return elementsArray;
    }
}

namespace Ix.DOM
{
    export function addClass<T extends HTMLElement | SVGElement>(classNames: string | string[])
    {
        return function (elements: T | T[] | IEnumerable<T>)
        {
            const addClasses = (names: string[]) => (el: T) => names.forEach(name => el.classList.add(name));

            return Util.coerceAndForEach<T>(elements, addClasses(Util.coerceToArray(classNames)));
        }
    }

    export function removeClass<T extends HTMLElement | SVGElement>(classNames: string | string[])
    {
        return function (elements: T | T[] | IEnumerable<T>)
        {
            const removeClasses = (names: string[]) => (el: T) => names.forEach(name => el.classList.remove(name));

            return Util.coerceAndForEach<T>(elements, removeClasses(Util.coerceToArray(classNames)));
        }
    }

    export function toggleClass<T extends HTMLElement | SVGElement>(classNames: string | string[])
    {
        return function (elements: T | T[] | IEnumerable<T>)
        {
            const toggleClasses = (names: string[]) => (el: T) => names.forEach(name => el.classList.toggle(name));

            return Util.coerceAndForEach<T>(elements, toggleClasses(Util.coerceToArray(classNames)));
        }
    }

    export function hasClass<T extends HTMLElement | SVGElement>(className: string)
    {
        return function (element: T | T[] | IEnumerable<T>)
        {
            return Util.coerceToEnumerable<T>(element).any(el => el.classList.contains(className));
        }
    }

    export function hasAttr<T extends string>(attributeName: string)
    {
        return function (element: HTMLElement | SVGElement | Element)
        {
            return element.hasAttribute(attributeName);
        }
    }

    export function hasDataAttr<T extends string>(attributeName: string)
    {
        return hasAttr(`data-${attributeName}`);
    }

    export function attr<T extends string>(attributeName: string)
    {
        return function (element: HTMLElement | SVGElement | Element)
        {
            if (element.hasAttribute(attributeName))
            {
                return element.getAttribute(attributeName) as T;
            }

            throw new Error(`Attribute ${attributeName} does not exist on ${element}`);
        }
    }

    export function attrAsNumber<T extends number>(attributeName: string)
    {
        return function (element: HTMLElement | SVGElement | Element)
        {
            return parseInt(attr(attributeName)(element)) as T;
        }
    }

    export function setAttr<T extends HTMLElement | SVGElement | Element>(attributeName: string, attributeValue: string | number)
    {
        return function (element: T)
        {
            return element.setAttribute(attributeName, attributeValue.toString());
        }
    }

    export function data<T extends string>(dataAttributeName: string)
    {
        return attr<T>(`data-${dataAttributeName}`);
    }

    export function dataAttrAsNumber<T extends number>(dataAttributeName: string)
    {
        return attrAsNumber<T>(`data-${dataAttributeName}`);
    }

    export function css<T extends HTMLElement | SVGElement>(properties: CSSProperties)
    {
        return function (element: T)
        {
            for (var cssProperty in properties)
            {
                // Cast to HTMLElement as SVGElement has style property as well just not standard
                (element as any as HTMLElement).style[cssProperty as any as number] = properties[cssProperty];
            }

            return element;
        }
    }

    export function setInnerHtml<T extends HTMLElement | SVGElement>(element: T)
    {
        return function (html: string)
        {
            return element.innerHTML = html;
        }
    }

    export function children<C, T extends HTMLElement | SVGElement>(element: T)
    {
        return Util.toArray<C>(element.children as any);
    }

    export function remove<T extends HTMLElement | SVGElement>(element: T)
    {
        element.parentNode.removeChild(element);
    }

    export function append<T extends HTMLElement | SVGElement>(parent: T)
    {
        return function <T extends HTMLElement | SVGElement>(element: T)
        {
            parent.appendChild(element);
        }
    }

    export function hide<T extends HTMLElement | SVGElement>(element: T)
    {
        (element as HTMLElement).style.display = 'none';
    }

    export function show<T extends HTMLElement | SVGElement>(element: T)
    {
        (element as HTMLElement).style.display = 'block';
    }

    export function value<T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(element: T, setValue?: string | number)
    {
        return setValue ? element.value = setValue.toString() : element.value;
    }

    export function valueAsNumber<T extends HTMLInputElement>(element: T, setValue?: number)
    {
        return setValue ? element.valueAsNumber = setValue : element.valueAsNumber;
    }

    export function elementById<T extends HTMLElement | SVGElement>(id: string): T
    {
        var element = document.getElementById(id);

        if (element)
        {
            return element as any as T;
        }

        throw new Error(`Element #${id} does not exist.`);
    }

    export function querySelectorOrNull<T extends HTMLElement | SVGElement>(selector: string, root: Element | HTMLDocument = document): T | null
    {
        return root.querySelector(selector) as any as T;
    }

    export function querySelector<T extends HTMLElement | SVGElement>(selector: string, root: Element | HTMLDocument = document): T
    {
        var element = root.querySelector(selector);

        if (element)
        {
            return element as any as T;
        }

        throw new Error(`No match for ${selector} under ${root}`);
    }

    export function querySelectorAll<T extends HTMLElement | SVGElement>(selector: string, root: Element | HTMLDocument = document): IEnumerable<T>
    {
        return Util.toEnumerable<T>(root.querySelectorAll(selector) as any);
    }

    export function ready(func: () => void)
    {
        document.readyState != 'loading' ? func() : document.addEventListener('DOMContentLoaded', func);
    }
}
