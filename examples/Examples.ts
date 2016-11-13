/// <reference path="../Ix-DOM.ts" />

window.addEventListener('beforeunload', event =>
{
    var inputHasNotBeenSaved = Ix.DOM.hasClass('dirty');

    if (Ix.DOM.querySelectorAll('input').any(inputHasNotBeenSaved))
    {
        // Prevent page navigation
        event.returnValue = "Note: you have unsaved changes.";
    }
});