it('should trigger onChange callback when there are less than MAX_FILES_COUNT', async () => {
  const { getByLabelText } = renderFileInput(
    <FileInput
      type='files'
      onChange={onChangeMock}
      MAX_FILES_COUNT={maxFilesCountMock}
    />
  );

  const file = new File(['content'], 'text.txt', {
    type: 'text/txt',
  });

  userEvent.upload(getByLabelText('Upload files'), file);

  expect(onChangeMock).toHaveBeenCalled();
});

it('should not trigger onChange callback when there are more than MAX_FILES_COUNT', async () => {
  const { getByLabelText, queryByText } = renderFileInput(
    <FileInput
      type='files'
      onChange={onChangeMock}
      MAX_FILES_COUNT={maxFilesCountMock}
    />
  );

  const files = [
    new File(['content'], 'example.txt', {
      type: 'text/plain',
    }),
    new File(['content'], 'example.txt', {
      type: 'text/plain',
    }),
    new File(['content'], 'example.pdf', {
      type: 'application/pdf',
    }),
    new File(['content'], 'example.ppt', {
      type: 'application/vnd.ms-powerpoint',
    }),
  ];

  userEvent.upload(getByLabelText('Upload files'), files);

  expect(
    queryByText(
      /You can’t upload more than 3 files at once. Please select fewer files./i
    )
  ).toBeInTheDocument();

  expect(onChangeMock).not.toHaveBeenCalled();
})