(function($){
  $(function(){
    var select = $('select#time-series'),
        options = select.find('option'),
        defaultOption = options.first(),
        selectedTimeSeries = [];

    var renderSelect = function() {
        select.material_select('destroy');
        select.empty();
        select.append(defaultOption);

        // append the allTimeSeries selected where difference with selectedTimeSeries
        var newOptions = _.difference(allTimeSeries, selectedTimeSeries);
        _.each(newOptions, function(option) {
            var node = '<option value="' + option.val + '">' + option.label + '</option>';
            select.append(node);
        });

        select.val('');
        select.material_select();
    };

    var renderChips = function(selectedTimeSeries) {
        var component = $('div#active-time-series');

        if(_.isEmpty(selectedTimeSeries)) {
            p = $('<p>');
            p.text('No hay series seleccionadas.');
            component.append(p);
        } else {
            component.empty();
            _.each(selectedTimeSeries, function(data) {
                var chip = $('<div class="chip">' + data.label + '<i class="close material-icons">close</i></div>');
                chip.data('value', data.val);
                component.append(chip);
            });
        }

        renderSelect();
    };

    var addSelectedTimeSeries = function(newTimeSeries) {
        selectedTimeSeries.push(newTimeSeries);
        selectedTimeSeries = _.unique(selectedTimeSeries);
        renderChips(selectedTimeSeries);
    };

    var allTimeSeries = _.map(options.slice(1), function(option) {
        var instance = $(option);
        return {
            val: instance.val(),
            label: instance.text(),
        };
    });

    select.on('change', function() {
        var selectedValue = $(this).val(),
            data = _.find(allTimeSeries, function(option) {
                return option.val == selectedValue
            });

        addSelectedTimeSeries(data);
    });

    $('button#btn-render').on('click', function(event) {
        event.preventDefault();
        // render the data in selectedTimeSeries...
        console.log(selectedTimeSeries);
        renderSelect();
    });

    $('body').on('click', 'div.chip i.close', function() {
        var component = $(this),
            deletedVal = component.parent().data('value');

        selectedTimeSeries = _.filter(selectedTimeSeries, function(data) {
            return data.val !== deletedVal;
        });

        renderChips(selectedTimeSeries);
    });
  });
})(jQuery);
