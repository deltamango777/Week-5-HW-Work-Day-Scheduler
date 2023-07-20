$(function () {
  $("#currentDay").text(dayjs().format('MMMM D, YYYY'));

  // create time blocks for working hours (9AM - 5PM)
  for (let hour = 9; hour <= 17; hour++) {
    const id = `hour-${hour}`;
    var row = $('<div>')
      .addClass('row time-block')
      .attr('id', id);

    var timeCol = $('<div>')
      .addClass('col-2 col-md-1 hour text-center py-3')
      .text(formatAMPM(hour));

    var textarea = $('<textarea>')
      .addClass('col-8 col-md-10 description')
      .attr('rows', 3)
      .val(localStorage.getItem(id));

    var button = $('<button>')
      .addClass('btn saveBtn col-2 col-md-1')
      .attr('aria-label', 'save')
      .append($('<i>').addClass('fas fa-save'))
      .click({textarea: textarea, id: id}, function(event) {
        localStorage.setItem(event.data.id, event.data.textarea.val());
      });

    row.append(timeCol, textarea, button);
    $('#timeBlocks').append(row);
  }

  // apply past, present, or future class to each time block
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    var currentHour = dayjs().hour();
    if (blockHour < currentHour) {
      $(this).addClass('past');
    } else if (blockHour === currentHour) {
      $(this).removeClass('future').addClass('present');
    } else {
      $(this).removeClass('present').addClass('future');
    }
  });
});

// Function to format hours to AM/PM format
function formatAMPM(hour) {
  var ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;  // the hour '0' should be '12'
  return hour + ampm;
}
