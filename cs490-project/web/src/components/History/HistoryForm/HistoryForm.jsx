import React from 'react';
import { Form, FormError, FieldError, Label, TextField, Submit } from '@redwoodjs/forms';
import { useAuth } from 'src/auth';
import { useMutation, gql, useQuery } from '@redwoodjs/web';
import { Toaster, toast } from '@redwoodjs/web/toast';

const CREATE_HISTORY_MUTATION = gql`
  mutation CreateHistoryMutation($input: CreateHistoryInput!) {
    createHistory(input: $input) {
      id
    }
  }
`;

const GET_USER_HISTORY_QUERY = gql`
  query GetUserHistory {
    histories {
      id
      inputLanguage
      outputLanguage
      inputText
      outputText
      userId
      createdAt
    }
  }
`;

const HistoryForm = () => {
  const { currentUser } = useAuth();
  const [createHistory, { loading: saving, error: saveError }] = useMutation(CREATE_HISTORY_MUTATION, {
    onCompleted: () => {
      toast.success('History created');
      refetch(); // Refresh history after creating a new item
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { loading: historyLoading, error: historyError, data, refetch } = useQuery(GET_USER_HISTORY_QUERY);

  const onSubmit = (data) => {
    const input = {
      ...data,
      userId: currentUser.id,
    };
    createHistory({ variables: { input } });
  };

  if (historyLoading) return <div>Loading...</div>;
  if (historyError) return <div>Error: {historyError.message}</div>;

  const userHistory = data.histories.filter((historyItem) => historyItem.userId === currentUser.id);

  return (
    <div>
      <div className="rw-form-wrapper">
        <Toaster />
        <Form onSubmit={onSubmit} error={saveError}>
          <FormError
            error={saveError}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />

          <Label name="inputLanguage" className="rw-label">
            Input language
          </Label>
          <TextField name="inputLanguage" className="rw-input" validation={{ required: true }} />
          <FieldError name="inputLanguage" className="rw-field-error" />

          <Label name="outputLanguage" className="rw-label">
            Output language
          </Label>
          <TextField name="outputLanguage" className="rw-input" validation={{ required: true }} />
          <FieldError name="outputLanguage" className="rw-field-error" />

          <Label name="inputText" className="rw-label">
            Input text
          </Label>
          <TextField name="inputText" className="rw-input" validation={{ required: true }} />
          <FieldError name="inputText" className="rw-field-error" />

          <Label name="outputText" className="rw-label">
            Output text
          </Label>
          <TextField name="outputText" className="rw-input" validation={{ required: true }} />
          <FieldError name="outputText" className="rw-field-error" />

          <div className="rw-button-group">
            <Submit disabled={saving} className="rw-button rw-button-blue">
              Save
            </Submit>
          </div>
        </Form>
      </div>

      <div>
        <h2>Your History</h2>
        {userHistory.map((historyItem) => (
          <div key={historyItem.id}>
            <p>Input language: {historyItem.inputLanguage}</p>
            <p>Output language: {historyItem.outputLanguage}</p>
            <p>Input text: {historyItem.inputText}</p>
            <p>Output text: {historyItem.outputText}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryForm;
