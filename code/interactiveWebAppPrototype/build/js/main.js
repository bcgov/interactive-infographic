var bcdevexchange = {
  accordion: {
    list: [],
    hide: function(accordionId) {
      var filterCollection = bcdevexchange.accordion.list.filter(function(child){
        var toReturn;
        if (child.triggerId === accordionId) {
          toReturn = child;
        }
        return toReturn;
      });
      $('.js-accordion[data-accordionId='+filterCollection[0].triggerId+']').attr('aria-pressed', 'false');
      $(filterCollection[0].targetId).attr('aria-hidden', 'true');
    },
    toggle: function(accordionId) {
      var filterCollection = bcdevexchange.accordion.list.filter(function(child){
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
    closeOthers: function(accordionId) {
      var mapCollection = bcdevexchange.accordion.list.filter(function(child){
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
    initialize: function(accordionLink) {
      var accordionId,
        href;


      // record id, target href and add attribute if needed
      accordionId = $(accordionLink).attr('data-accordionId');
      if (accordionId === undefined) {
        accordionId =  'accordionId' + bcdevexchange.accordion.list.length;
        $(accordionLink).attr('data-accordionId', accordionId);
      }
      href = $(accordionLink).attr('href') || $(accordionLink).attr('data-href');

      bcdevexchange.accordion.list.push({
        triggerId: accordionId,
        targetId: href
      });
      // hide the target element
      bcdevexchange.accordion.hide(accordionId);
      // make trigger not selected
      $(accordionLink).attr('aria-pressed', 'false');

      // event binding
      $(accordionLink).off('.jsAccordion');

      $(accordionLink).on('click.jsAccordion', function(){
        bcdevexchange.accordion.closeOthers(accordionId);
        bcdevexchange.accordion.toggle(accordionId);
      });
    }
  },
  youtube: {
    done: false,
    player: false,
    loadApi: function(){
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },
    initialize: function(){
      bcdevexchange.youtube.loadApi();
      window.onYouTubeIframeAPIReady = function() {
        bcdevexchange.youtube.player = new YT.Player('youtubeVideo', {
          height: '390',
          width: '640',
          videoId: 'YtGh6ebc5lw',
          events: {
            'onReady': bcdevexchange.youtube.onPlayerReady,
            'onStateChange': bcdevexchange.youtube.onPlayerStateChange
          }
        });

      }
    },
    onPlayerReady: function(event) {
      //event.target.playVideo();
    },
    onPlayerStateChange: function(event) {
      //if (event.data == YT.PlayerState.PLAYING && !done) {
      //  setTimeout(stopVideo, 6000);
      //  done = true;
      //}
    },
    stopVideo: function() {
      bcdevexchange.youtube.player.stopVideo();
    },
    startVideo: function() {
      bcdevexchange.youtube.player.playVideo();
    }
  }
};

$( document ).ready(function() {
  
  bcdevexchange.youtube.initialize();
  
  $('#modalVideo').on('shown.bs.modal', function () {
    if (bcdevexchange.youtube.player) {
      bcdevexchange.youtube.startVideo();
    }
  });
  $('#modalVideo').on('hide.bs.modal', function () {
    if (bcdevexchange.youtube.player) {
      bcdevexchange.youtube.stopVideo();
    }
  });


  $('.js-accordion').each(function(){
    bcdevexchange.accordion.initialize(this);
  });
});