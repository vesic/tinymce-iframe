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
    height: 500,

    setup: function (editor) {
      editor.on("init", function () {
        console.log(editor);
      });

      editor.addButton('iframe', {
        type: 'button',
        text: '<iframe />',
        icon: false,
        onclick: () => {
          editor.windowManager.open({
            title: 'Enter URL',
            body: [
              { type: 'textbox', name: 'url', label: 'URL' },
              { type: 'textbox', name: 'width', label: 'width' },
              { type: 'textbox', name: 'height', label: 'height' },
            ],
            onsubmit: e => {
              let { url, width, height } = e.data;

              // check input
              if (url === '' || width === '' || height === '') {
                alert('Check values!')
                return;
              } else {
                // TODO: test NaN
                width = parseInt(width, 10);
                height = parseInt(height, 10);
                editor.insertContent(`
                  <iframe width="${width}"
                          height="${height}"
                          target='_top' src="${e.data.url}"></iframe>
                `)
              }
            }            
          })
        }
      })
    },

    plugins: 'link image code',
    // menubar: 'file edit insert view format table tools',
    toolbar: 'iframe | undo redo | bold italic | alignleft aligncenter alignright | code'
  };
});