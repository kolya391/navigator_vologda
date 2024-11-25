ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [59.220492, 39.891523], // Координаты центра Вологды
        zoom: 12
    });

    var routeForm = document.getElementById('routeForm');
    var distanceSpan = document.getElementById('distance');
    var timeSpan = document.getElementById('time');
    var fuelCostSpan = document.getElementById('fuelCost');

    routeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        var fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
        var fuelPrice = parseFloat(document.getElementById('fuelPrice').value);

        ymaps.route([start, end], {
            mapStateAutoApply: true
        }).then(function(route) {
            var distance = route.getLength() / 1000; // Расстояние в километрах
            var time = route.getTime() / 60; // Время в минутах
            var fuelCost = (distance / 100) * fuelConsumption * fuelPrice; // Затраты на топливо

            distanceSpan.textContent = distance.toFixed(2);
            timeSpan.textContent = time.toFixed(0);
            fuelCostSpan.textContent = fuelCost.toFixed(2);

            myMap.geoObjects.removeAll();
            myMap.geoObjects.add(route);
        }, function(error) {
            alert('Ошибка построения маршрута: ' + error.message);
        });
    });
}