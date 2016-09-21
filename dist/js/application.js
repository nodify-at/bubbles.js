'use strict';

(function() {
    var app = angular.module('tribefire.bubble', []);
    app.directive('tribefireBubble', TribefireBubble);

    TribefireBubble.$inject = ['DataParser', 'BubbleTreeFactory'];
    function TribefireBubble(DataParser, BubbleTreeFactory) {
        return {
            'restrict': 'A',
            'scope'   : {
                'nodeSelected': '=',
                'navigateTo'  : '=',
                'data'        : '=',
                'scaleFactor' : '@',
                'disableNavigationSingleNode': '@',
                'enableDrop'  : '@',
                'enableFlip'  : '@',
                'handleDrop'  : '='
            },
            'link'    : link
        };

        function link(scope, element, attrs) {

            var options = {
                enableDrop: scope.enableDrop,
                handleDrop: scope.handleDrop,
                enableFlip: scope.enableFlip,

                disableNavigationSingleNode: scope.disableNavigationSingleNode,
                scaleFactor: scope.scaleFactor,
                ready: function(nodes) {
                },
                navigateTo: scope.navigateTo,
                onClick: function(node) {
                    if (typeof scope.nodeSelected === 'function') {
                        scope.nodeSelected(node);
                    }

                    node.clickCount = node.clickCount ? node.clickCount + 1 : 1;
                    if (node.detail) {
                        // $('.label.' + node.id).flip();
                    }
                }
            };
            var container = $('.bubbletree').get(0);

            var tree;
            scope.$watch('data', function(oldValue, newValue){
                if (oldValue === newValue) {
                    return;
                }
                if (tree) {
                    return;
                }
                var parsed = DataParser.parse(scope.data);
                tree = BubbleTreeFactory.build(parsed, container, options);
            }, true);
        }
    }
})();
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