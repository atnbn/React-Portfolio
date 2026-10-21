import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import emailjs from 'emailjs-com';
import { Contact } from './contact_component';

jest.mock('emailjs-com', () => ({ send: jest.fn() }));

beforeEach(() => {
    process.env.REACT_APP_EMAILJS_SERVICE_ID = 'service_test';
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID = 'template_test';
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY = 'public_test';
    jest.clearAllMocks();
});

function fillForm() {
    fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello!' } });
}

test('sends the reply address and clears fields only after success', async () => {
    let finish;
    emailjs.send.mockReturnValue(new Promise(resolve => { finish = resolve; }));
    render(<Contact />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
    expect(emailjs.send).toHaveBeenCalledWith('service_test', 'template_test', expect.objectContaining({ reply_to: 'ada@example.com', message: 'Hello!' }), 'public_test');
    finish({ status: 200 });
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Message sent successfully'));
    expect(screen.getByLabelText('Message')).toHaveValue('');
});

test('keeps the message after failure and allows another attempt', async () => {
    emailjs.send.mockRejectedValue(new Error('Offline'));
    render(<Contact />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('could not be sent');
    expect(screen.getByLabelText('Message')).toHaveValue('Hello!');
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
});

test('offers an encoded email draft when only a recipient is configured', () => {
    delete process.env.REACT_APP_EMAILJS_SERVICE_ID;
    process.env.REACT_APP_CONTACT_EMAIL = 'owner@example.com';
    render(<Contact />);
    fillForm();
    const link = screen.getByRole('link', { name: 'Open email app with this message' });
    expect(link.getAttribute('href')).toContain('mailto:owner@example.com?subject=');
    expect(decodeURIComponent(link.getAttribute('href'))).toContain('Hello!');
    expect(screen.queryByRole('button', { name: 'Send message' })).not.toBeInTheDocument();
    delete process.env.REACT_APP_CONTACT_EMAIL;
});
