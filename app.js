var myAppModule = angular.module('myApp', ['ui.tinymce']);

myAppModule.controller('TinyMceController', function ($scope) {
  $scope.tinymceModel;// = 'Initial content';

  $scope.getContent = function () {
    console.log('Editor content:', $scope.tinymceModel);
  };

  $scope.setContent = function () {
    $scope.tinymceModel = 'Time: ' + (new Date());
  };

  $scope.tinymceOptions = {

    setup: function (editor) {
      editor.on("init", function () {
        console.log(editor);
      });

      editor.addButton('custom', {
        type: 'button',
        text: 'Webpage',
        icon: false,
        onclick: () => {
          editor.windowManager.open({
            title: 'Enter URL',
            body: [
              { type: 'textbox', name: 'url', label: 'URL' }
            ],
            onsubmit: function (e) {
              // Insert content when the window form is submitted
              // editor.insertContent('Title: ' + e.data.title);
              console.log(e.data)
              editor.insertContent(`
                <iframe src="${e.data.url}"></iframe>
              `)
            }            
          })
        }
      })

      
    },

    plugins: 'link image code',
    toolbar: 'custom undo redo | bold italic | alignleft aligncenter alignright | code'
  };
});