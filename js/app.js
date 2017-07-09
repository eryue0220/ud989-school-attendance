/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */

/* STUDENT APPLICATION */
$(function() {

    function getRandom() {
        return (Math.random() >= 0.5);
    }

    function initialState() {
        if (localStorage.attendance) return localStorage.attendance;

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
        return JSON.stringify(attendance);
    }

    function renderAttendance(attendance) {
        var $students = $('.student');
        var len = $students.length;
        var $student;

        for (var i = 0; i < len; i++) {
            $student = $students.eq(i);
            $student.find('.attend-col').each(function(index, dom) {
                $(dom).find('input').prop('checked', attendance[$student.find('.name-col').text()][index]);
            });
        }
    }

    function countMissing() {
        var $students = $('.student');
        var $student;
        var $attendCol;
        var miss;

        for (var i = 0, len = $students.length; i < len; i++) {
            $student = $students.eq(i);
            $attendCol = $student.find('.attend-col')
            miss = 0;
            for (var j = 0, length = $attendCol.length; j < length; j++) {
                !$attendCol.eq(j).find('input').prop('checked') && (miss += 1);
            }
            $student.find('.missed-col').text(miss);
        }
    }

    function bindClickEvent() {
        $('.student').on('click', 'input', function() {
            countMissing();
        });
    }

    function render() {
        renderAttendance(JSON.parse(initialState()));
        countMissing();
        bindClickEvent();
    }

    render();
}());