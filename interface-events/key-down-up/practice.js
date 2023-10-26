
function runOnKeys(func, ... codes) {
    let pressed = new Set();
   document.addEventListener('keydown', (e) => {
      pressed.add(e.code);

      for (let code of codes) {
        if (!pressed.has(code)){
            return;
        }
      }

      pressed.clear();
      func();
    });

    document.addEventListener('keyup', (e) => {
       pressed.delete(e.code);
    });
}


runOnKeys(
    () => alert("Привіт!"),
    "KeyQ",
    "KeyW"
  );

// write promt to test FileUploadField component
// test if the component renders current files if the length of currentFiles is greater than 0
// test if it shows loader if the state is loading
// test if triggers onDelete if delete button is clicked
// test if renderd FileInput with type="photo" and type="file" props if isDesktop is false
// test if it renders FileInput only with type="file" prop if isDesktop is true

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../../test-utilities/common';
import FileUploadField from './FileUploadField';
import { useApp } from '../../../../hooks/state/useApp';

const currentFilesMock = [
  { localId: '1', id: 'file1', name: 'file1.txt', error: null },
  { localId: '2', id: 'file2', name: 'file2.txt', error: 'Some error' },
];

jest.mock('../../../../hooks/state/useApp');

describe('FileUploadField', () => {
  beforeEach(() => {
    useApp.mockReturnValue({ isDesktop: true });
  });

  it('should render current files correctly if the length of current files is greater than 0', () => {
    const { getByText } = render(
      <FileUploadField
        isLoading={false}
        currentFiles={currentFilesMock}
        onChange={() => {}}
        onDelete={() => {}}
      />
    );

    currentFilesMock.forEach((file) => {
      const fileName = getByText(file.name);
      expect(fileName).toBeInTheDocument();

      if (file.error) {
        const errorElement = getByText(file.error);
        expect(errorElement).toBeInTheDocument();
      }
    });
  });

  it('should show loader if the state is loading', () => {
    const { getByLabelText } = render(
      <FileUploadField
        currentFiles={currentFilesMock}
        isLoading
      />
    );

    expect(getByLabelText('Loading')).toBeInTheDocument();
  });

  it('should trigger onDelete if delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    const { getAllByText } = render(
      <FileUploadField
        currentFiles={currentFilesMock}
        onDelete={onDeleteMock}
      />
    );
    const deleteButtons = getAllByText('Delete');

    userEvent.click(deleteButtons[0]);
    userEvent.click(deleteButtons[1]);

    expect(onDeleteMock).toHaveBeenCalledWith(currentFilesMock[0].localId);
    expect(onDeleteMock).toHaveBeenCalledWith(currentFilesMock[1].localId);
  });

  it('should render FileInput with type="photo" and type="file" props if isDesktop is false', () => {
    useApp.mockReturnValue({ isDesktop: false });
    const { queryByText } = render(
      <FileUploadField
        currentFiles={currentFilesMock}
        isDesktop={false}
      />
    );

    expect(queryByText('Add photos')).toBeInTheDocument();
    expect(queryByText('Attach files')).toBeInTheDocument();
  });

  it('should render FileInput only with type="files" prop if isDesktop is true', () => {
    const { queryByText } = render(
      <FileUploadField
        currentFiles={currentFilesMock}
        isDesktop
      />
    );

    expect(queryByText('Attach files')).toBeInTheDocument();
    expect(queryByText('Add photos')).not.toBeInTheDocument();
  });
});
