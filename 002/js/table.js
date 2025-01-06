$(function() {
  
  $('table').on('mouseenter mouseleave', 'td', function(e) {
    (function(td, type) {
      td.parent()[type]('hover');
      td.closest('table').children('colgroup').eq(td.index())[type]('hover');
      th.parent()[type]('hover');
      th.closest('table').children('colgroup').eq(td.index())[type]('hover');
    })(
      $(this),
      e.type === 'mouseenter' ? 'addClass' : 'removeClass'
    );
  });
  
  // this verifies the dynamic nature of the above
  $('button').click(function(){
    $(this).parent().next().append('<tr><td></td><td></td><td></td><td></td><td></td></tr>');
  });
  
});