/**
 * Created by pkdo10 on 12/26/2015.
 */
angular.module('storyCtrl', ['storyService'])

.controller('StoryController', function(Story, socketIO){

        var vm = this;

        Story.allStory()
            .success(function(data){
                vm.stories = data;
            });

        vm.createStory = function(){
            vm.message = '';
            Story.create(vm.storyData)
                .success(function(data){

                    //clear up the form
                    vm.storyData = '';

                    vm.message = data.message;
                    vm.stories.push(data);
                });
        };

        socketIO.on('story', function(data){
            vm.stories.push(data);
        });


    });