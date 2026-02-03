const API_URL = 'http://localhost:3000/api'; // Адрес твоего отдельного бэкенда

export async function sendMessageToAI(text) {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });

    if (!response.ok) throw new Error('Ошибка сети');
    return await response.json();
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    throw error;
  }
}