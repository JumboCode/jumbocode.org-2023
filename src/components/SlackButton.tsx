'use client';

export default function SlackButton() {
  return <button type="button" onClick={() => fetch('/slack', { method: 'POST' })}>slack test</button>;
}
