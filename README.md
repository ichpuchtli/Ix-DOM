## Ix.Dom.ts (Incomplete) (Missing Deps)

```ts
namespace Ix.DOM
{
    export function addClass<T extends HTMLElement | SVGElement>(classNames: string)
    {
        return function (elements: T | T[] | IEnumerable<T>)
        {
            const addClasses = (names: string[]) => (el: T) => names.forEach(name => el.classList.add(name));

            return Util.coerceAndForEach(elements, addClasses(classNames.split(" ")));
        }
    }

    export function removeClass<T extends HTMLElement | SVGElement>(classNames: string)
    {
        return function (elements: T | T[] | IEnumerable<T>)
        {
            const removeClasses = (names: string[]) => (el: T) => names.forEach(name => el.classList.remove(name));

            return Util.coerceAndForEach(elements, removeClasses(classNames.split(" ")));
        }
    }

    export function toggleClass<T extends HTMLElement | SVGElement>(classNames: string)
    {
        return function (elements: T | T[] | IEnumerable<T>)
        {
            const toggleClasses = (names: string[]) => (el: T) => names.forEach(name => el.classList.toggle(name));

            return Util.coerceAndForEach(elements, toggleClasses(classNames.split(" ")));
        }
    }

    export function hasClass<T extends HTMLElement | SVGElement>(className: string)
    {
        return function (element: T | T[] | IEnumerable<T>)
        {
            return Util.coerceToEnumerable(element).any(el => el.classList.contains(className));
        }
    }

    export function attr<T extends HTMLElement | SVGElement>(attributeName: string)
    {
        return function (element: T)
        {
            return element.getAttribute(attributeName);
        }
    }

    export function data<T extends HTMLElement | SVGElement>(dataAttributeName: string)
    {
        return function (element: T)
        {
            return element.getAttribute(`data-${dataAttributeName}`);
        }
    }

    export function css<T extends HTMLElement | SVGElement>(properties: CSSProperties)
    {
        return function (element: T)
        {
            for (var cssProperty in properties)
            {
                (element as any as HTMLElement).style[cssProperty] = properties[cssProperty];
            }

            return element;
        }
    }

    export function elementById<T extends HTMLElement|SVGElement>(id:string) : T
    {
        return document.getElementById(id) as any as T;
    }

    export function querySelector<T extends HTMLElement|SVGElement>(selector:string, root : Element|HTMLDocument = document) : T
    {
        return root.querySelector(selector) as any as T;
    }

    export function querySelectorAll<T extends HTMLElement|SVGElement>(selector:string, root : Element|HTMLDocument = document) : IEnumerable<T>
    {
        return Util.toEnumerable<T>(root.querySelectorAll(selector));
    }

}
```


## Usage

```ts
window.addEventListener('beforeunload', event =>
{
    var inputHasNotBeenSaved = Ix.DOM.hasClass('dirty');

    if (Ix.DOM.querySelectorAll('input').any(inputHasNotBeenSaved))
    {
    // Prevent page navigation
    event.returnValue = "Note: you have unsaved changes.";
    }
});
```
