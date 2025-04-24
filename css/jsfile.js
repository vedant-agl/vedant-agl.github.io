/* Show/Hide functions *********************************************************/

$(document).on("click", "a.more, a.less", function(event) {
  event.preventDefault();
  
  // Get the clicked element and its parent subsection
  const clickedElement = $(this);
  const parentSubsection = clickedElement.closest(".subsection");

  // Get the target ID from the onclick attribute
  const targetId = clickedElement.attr("onclick").match(/'([^']+)'/)[1];
  const targetElement = $("#" + targetId);

  // Find currently open collapsible within the same subsection
  const currentOpen = parentSubsection.find("a.less");
  const currentId = currentOpen.attr("onclick")?.match(/'([^']+)'/)?.[1];

  if (currentId && currentId !== targetId) {
    // If a different collapsible in the same subsection is open, close it first
    $("#" + currentId).slideUp('slow', function() {
      currentOpen.attr('class', 'more');
      // Open the clicked collapsible after the current one closes
      clickedElement.attr('class', 'less');
      targetElement.slideDown('slow');
    });
  } else if (currentId === targetId) {
    // If clicking the already open collapsible, close it
    targetElement.slideUp('slow', function() {
      clickedElement.attr('class', 'more');
    });
  } else {
    // If no collapsible is open in the subsection, open the clicked one
    clickedElement.attr('class', 'less');
    targetElement.slideDown('slow');
  }
});