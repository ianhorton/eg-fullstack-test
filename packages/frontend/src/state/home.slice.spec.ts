import homeReducer, {
    HomeState,
    initialState,
    resetHomeCommand,
    fetchMessageCommand,
    fetchMessageSucceededEvent,
    fetchMessageFailedEvent,
  } from './home.slice';
  
  describe('homeSlice reducer', () => {
  
    it('should handle resetHomeCommand', () => {
      // Arrange
      const stateWithChanges: HomeState = {
        ...initialState,
        message: 'Hello, world!',
        loading: true,
        loaded: true,
        errors: ['Some error'],
      };
      const action = resetHomeCommand();
  
      // Act
      const nextState = homeReducer(stateWithChanges, action);
  
      // Assert
      expect(nextState).toEqual(initialState);
    });
  
    it('should handle fetchMessageCommand', () => {
      // Arrange
      const action = fetchMessageCommand();
  
      // Act
      const nextState = homeReducer(initialState, action);
  
      // Assert
      expect(nextState.loading).toEqual(true);
      expect(nextState.loaded).toEqual(false);
    });
  
    it('should handle fetchMessageSucceededEvent', () => {
      // Arrange
      const message = 'Hello from the server!';
      const action = fetchMessageSucceededEvent(message);
  
      // Act
      const nextState = homeReducer(initialState, action);
  
      // Assert
      expect(nextState.message).toEqual(message);
      expect(nextState.loading).toEqual(false);
      expect(nextState.loaded).toEqual(true);
    });
  
    it('should handle fetchMessageFailedEvent', () => {
      // Arrange
      const errorMessage = 'Failed to fetch message';
      const action = fetchMessageFailedEvent(errorMessage);
  
      // Act
      const nextState = homeReducer(initialState, action);
  
      // Assert
      expect(nextState.errors).toContain(errorMessage);
      expect(nextState.loading).toEqual(false);
      expect(nextState.loaded).toEqual(false);
    });
  
  });
  