export const isTokenExpired = (token: string): boolean => {
  // 토큰의 만료 시간을 체크하는 로직 추가 (예: JWT의 만료 시간 체크)
  return false; // 예제에서는 항상 false를 반환
};

export const renewToken = async (expiredToken: string): Promise<string> => {
  try {
    const response = await fetch('http://192.168.0.200:8080/api/v1/sign/renew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${expiredToken}`,
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.statusCode === 200) {
        return result.user_token;
      }
    }
    throw new Error('Token renewal failed');
  } catch (error) {
    throw error;
  }
};
