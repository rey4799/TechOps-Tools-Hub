// utilities/noPinlessQueryGenerator.js
export function generateNoPinlessQuery() {
    const today = new Date();
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const startTimestamp = `${formatDate(today)} 00:00:00`;
    const endTimestamp = `${formatDate(today)} 23:59:59`;

    // Query untuk jumlah user no pin
    const noPinUserQuery = `
      SELECT COUNT(*)
      FROM MAV_LIMIT.USER_SETTING_LIMIT usl
      WHERE FEATURE_CODE = 'POSTLOGIN_NO_PIN'
        AND IS_DELETED = 0
        AND UPDATED_TIME <= TO_DATE('${endTimestamp}', 'YYYY-MM-DD HH24:MI:SS');
    `;

    // Query untuk QRIS pinless
    const qrisPinlessQuery = `
      SELECT COUNT(*)
      FROM MAV_QRIS.QRIS_STAGING qs 
      WHERE STAGING_STATUS IN ('SUCCESS')
        AND TRANSACTION_INITIATION = 2
        AND UPDATED_TIME >= TO_DATE('${startTimestamp}', 'YYYY-MM-DD HH24:MI:SS')
        AND UPDATED_TIME <= TO_DATE('${endTimestamp}', 'YYYY-MM-DD HH24:MI:SS');
    `;

    return { noPinUserQuery, qrisPinlessQuery };
}
