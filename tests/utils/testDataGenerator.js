class TestDataGenerator {
  // input test data generator
  static inputTestData(length) {
    // Use alphanumeric characters only to avoid flaky validation issues
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    return result;
  }


  // email input test generator
  static generateEmail(beforeLength = 4, afterLength = 3) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomPart = (len) =>
      Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

    return `${randomPart(beforeLength)}@${randomPart(afterLength)}.com`;
  }
}

module.exports = { TestDataGenerator };
