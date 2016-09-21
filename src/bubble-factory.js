'use strict';

(function() {
    var app = angular.module('tribefire.bubble');
    app.factory('BubbleTreeFactory', BubbleTreeFactory);

    function BubbleTreeFactory() {
        return {
            build: build
        };

        function build(data, container, options) {
            var config          = {};
            config.enableDrop   = options.enableDrop;
            config.handleDrop   = options.handleDrop;
            config.enableFlip   = options.enableFlip;

            config.disableNavigationSingleNode = options.disableNavigationSingleNode;
            config.data         = data;
            config.container    = container;
            config.bubbleType   = 'donut';
            config.scaleFactor  = options.scaleFactor;

            config.ready        = function(node, fromUrlChanged) {
                $('.amount').remove();
                options.ready(data);
            };
            config.navigateTo   = options.navigateTo;
            config.onClick      = options.onClick;

            config.rootPath     = './';
            return new BubbleTree(config);
        }
    }
})();