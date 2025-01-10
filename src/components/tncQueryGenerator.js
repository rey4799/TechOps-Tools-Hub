// utilities/tncQueryGenerator.js
export function generateTncQuery() {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
  
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const startTimestamp = `${formatDate(yesterday)} 00:00:00.000+07:00`;
    const endTimestamp = `${formatDate(today)} 00:00:00.000+07:00`;
  
    // Query untuk tnc_provisioning
    const tncProvisioningQuery = `
      SELECT 
        p.ID, 
        p.cif, 
        p.DATA_SHARING, 
        tc.CREATED_TIME, 
        tc.TERM_CONDITION_VERSION, 
        tc.TYPE
      FROM 
        MAV_PROFILE.PROFILE p
      JOIN 
        MAV_PROFILE.TERM_CONDITION tc
      ON 
        p.ID = tc.USER_ID
      JOIN 
        (
          SELECT 
            USER_ID, 
            MAX(CREATED_TIME) AS LATEST_CREATED_TIME
          FROM 
            MAV_PROFILE.TERM_CONDITION
          WHERE 
            TERM_CONDITION_VERSION = '18.0.0' 
            AND TYPE = 'PROVISIONING'
            AND (CREATED_TIME >= TIMESTAMP '${startTimestamp}' 
                OR UPDATED_TIME >= TIMESTAMP '${startTimestamp}')
            AND (CREATED_TIME <= TIMESTAMP '${endTimestamp}' 
                OR UPDATED_TIME <= TIMESTAMP '${endTimestamp}')
          GROUP BY 
            USER_ID
        ) latest_tc
      ON 
        tc.USER_ID = latest_tc.USER_ID 
        AND tc.CREATED_TIME = latest_tc.LATEST_CREATED_TIME
      WHERE
        tc.TERM_CONDITION_VERSION = '18.0.0' 
        AND tc.TYPE = 'PROVISIONING';
    `;
  
    // Query untuk tnc_consent
    const tncConsentQuery = `
      SELECT 
        ID, 
        USER_ID, 
        TERM_CONSENT_TYPE, 
        TERM_CONSENT_STATUS, 
        UPDATED_TIME, 
        CREATED_TIME, 
        VERSION 
      FROM 
        MAV_PROFILE.TERM_CONSENT 
      WHERE
        (CREATED_TIME >= TIMESTAMP '${startTimestamp}' 
         OR UPDATED_TIME >= TIMESTAMP '${startTimestamp}')
        AND (CREATED_TIME <= TIMESTAMP '${endTimestamp}' 
         OR UPDATED_TIME <= TIMESTAMP '${endTimestamp}');
    `;
  
    return { tncProvisioningQuery, tncConsentQuery };
  }
  