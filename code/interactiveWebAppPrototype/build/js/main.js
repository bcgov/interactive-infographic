var bcdevexchange = {
  accordionList: [],
  accordionHide: function(accordionId) {
    var filterCollection = bcdevexchange.accordionList.filter(function(child){
      var toReturn;
      if (child.triggerId === accordionId) {
        toReturn = child;
      }
      return toReturn;
    });
    $('.js-accordion[data-accordionId='+filterCollection[0].triggerId+']').attr('aria-pressed', 'false');
    $(filterCollection[0].targetId).attr('aria-hidden', 'true');
  },
  accordionShow: function(accordionId) {
    var filterCollection = bcdevexchange.accordionList.filter(function(child){
      var toReturn;
      if (child.triggerId === accordionId) {
        toReturn = child;
      }
      return toReturn;
    });
    $('.js-accordion[data-accordionId='+filterCollection[0].triggerId+']').attr('aria-pressed', 'true');
    $(filterCollection[0].targetId).attr('aria-hidden', 'false');
  },
  accordionToggle: function(accordionId) {
    var filterCollection = bcdevexchange.accordionList.filter(function(child){
      var toReturn;
      if (child.triggerId === accordionId) {
        toReturn = child;
      }
      return toReturn;
    });

    if ($(filterCollection[0].targetId).attr('aria-hidden') === 'true') {
      $('.js-accordion[data-accordionId='+filterCollection[0].triggerId+']').attr('aria-pressed', 'true');
      $(filterCollection[0].targetId).attr('aria-hidden', 'false');
    } else {
      $('.js-accordion[data-accordionId='+filterCollection[0].triggerId+']').attr('aria-pressed', 'false');
      $(filterCollection[0].targetId).attr('aria-hidden', 'true');
    }
  },
  accordionCloseOthers: function(accordionId) {
    var mapCollection = bcdevexchange.accordionList.filter(function(child){
      var toReturn;
      if (child.triggerId !== accordionId) {
        toReturn = child;
      }
      return toReturn;
    });

    mapCollection.map(function(child){
      $('.js-accordion[data-accordionId='+child.triggerId+']').attr('aria-pressed', 'false');
      $(child.targetId).attr('aria-hidden', 'true');
    });
  },
  accordionAction: function(accordionLink) {
    var accordionId,
      href;


    // record id, target href and add attribute if needed
    accordionId = $(accordionLink).attr('data-accordionId');
    if (accordionId === undefined) {
      accordionId =  'accordionId' + bcdevexchange.accordionList.length;
      $(accordionLink).attr('data-accordionId', accordionId);
    }
    href = $(accordionLink).attr('href') || $(accordionLink).attr('data-href');

    bcdevexchange.accordionList.push({
      triggerId: accordionId,
      targetId: href
    });
    // hide the target element
    bcdevexchange.accordionHide(accordionId);
    // make trigger not selected
    $(accordionLink).attr('aria-pressed', 'false');

    // event binding
    $(accordionLink).off('.jsAccordion');

    $(accordionLink).on('click.jsAccordion', function(){
      bcdevexchange.accordionCloseOthers(accordionId);
      bcdevexchange.accordionToggle(accordionId);
    });
  }
};

$( document ).ready(function() {
  $('.js-accordion').each(function(){
    bcdevexchange.accordionAction(this);
  });
});