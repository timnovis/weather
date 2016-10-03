/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //code
    }
};

var key = '662b852586d801918da2729cd0092559';

var weatherapp = new Vue({
    el : '#app',
    data : {
        weatherData: null,
        lat: null,
        lng: null
    },
    methods: {
        getWeather: function() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    weatherapp.retrieveData(position.coords.latitude, position.coords.longitude);
                    weatherapp.$set('lat', position.coords.latitude);
                    weatherapp.$set('lng', position.coords.longitude);
                });
            } else {
                $('#loading').removeClass('is-loading').addClass('disabled');
                weatherapp.$set('error', "Please enable geolocation");
            }
        },
        retrieveData: function(lat, lng) {
            $.ajax({
                'dataType' : 'jsonp',
                'url' : 'https://api.darksky.net/forecast/'+key+'/'+lat+','+lng+'?units=uk2',
                beforeSend: function() {
                    $('#loading').addClass('is-loading');
                },
                success: function(data) {
                    $('#loading').removeClass('is-loading').addClass('disabled');
                    weatherapp.$set('weatherData', data);
                }
            });
        }
    }
});

weatherapp.getWeather();