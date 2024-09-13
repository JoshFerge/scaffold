import { useState } from "react";

export function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Hello, Hono with aaa!</h1>
      <h2 className="text-2xl font-semibold mb-4">Example of useState()</h2>
      <Counter />
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Example of API fetch()
      </h2>
      <ClockButton />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => setCount(count + 1)}
    >
      You clicked me {count} times
    </button>
  );
}

const ClockButton = () => {
  const [response, setResponse] = useState<string | null>(null);

  const handleClick = async () => {
    const response = await fetch("/api/clock");
    const data = await response.json();
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    };
    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    <div className="mt-4">
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Get Server Time
      </button>
      {response && (
        <pre className="mt-4 p-4 bg-gray-100 rounded overflow-x-auto">
          {response}
        </pre>
      )}
    </div>
  );
};
