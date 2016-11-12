
/// <reference path="Ix-DOM.ts" />

window.addEventListener('beforeunload', event =>
{
    var inputHasNotBeenSaved = Ix.DOM.hasClass('dirty');

    if (Ix.DOM.querySelectorAll('input').any(inputHasNotBeenSaved))
    {
        // Prevent page navigation
        event.returnValue = "Note: you have unsaved changes.";
    }
});

var mapEventToTarget = (event: Event) => event.currentTarget as HTMLInputElement;

var markDirty = Ix.DOM.addClass('dirty');
var markInputDirty = (ev: Event) => markDirty(mapEventToTarget(ev)); // compose(mapEventToTarget, markDirty);

document.addEventListener('change', markInputDirty);

var circles = Ix.DOM.querySelectorAll<SVGCircleElement>('circle');

var draggableCircles = circles.where(circ => circ.r.baseVal.value > 5)
                              .select(circ => 
                              ({ 
                                  x: circ.cx.baseVal.value,
                                  y: circ.cy.baseVal.value
                              }))
                              .take(1);