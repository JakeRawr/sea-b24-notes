'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('resource service', function() {
  beforeEach(angular.mock.module('notesApp'));
  var Service;
  var $httpBackend;
  var notesService;
  var testNote = {'_id': '1', 'noteBody': 'hipster ipsum'};

  beforeEach(angular.mock.inject(function(ResourceBackend, _$httpBackend_){
    Service = ResourceBackend;
    $httpBackend = _$httpBackend_;
    notesService = new Service('notes');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get request to notes', function() {
    $httpBackend.expectGET('/api/notes').respond(200, []);

    var promise = notesService.index();

    promise.success(function(data) {
      expect(Array.isArray(data)).toBe(true);
    });

    $httpBackend.flush();
  });

  it('should be able to save a new note', function() {
    $httpBackend.expectPOST('/api/notes').respond(200, testNote);
    notesService.saveNew(testNote)
    .success(function(data) {
      expect(data.noteBody).toEqual('hipster ipsum');
      expect(data._id).toEqual('1');
    });

    $httpBackend.flush();
  });

  it('should be able to edit a note', function() {
    var modifiedTestNote = {'_id': '1', 'noteBody': 'hipster ipsum modified'};
    $httpBackend.expectPUT('/api/notes/1').respond(200,modifiedTestNote);
    notesService.save(modifiedTestNote)
    .success(function(data) {
      expect(data.noteBody).toEqual('hipster ipsum modified');
      expect(data._id).toEqual('1');
    });

    $httpBackend.flush();
  });

  it('should be able to delete a note', function() {
    $httpBackend.expectDELETE('/api/notes/1').respond(200, {msg: 'success!'} );
    notesService.delete(testNote)
    .success(function(data) {
      expect(data.msg).toEqual('success!');
    });

    $httpBackend.flush();
  });
});
