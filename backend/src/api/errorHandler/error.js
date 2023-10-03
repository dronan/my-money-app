// Function to parse MongoDB validation errors
module.exports = function parseMongoError(error) {
    const errorResponse = { errors: [] };
  
    if (error?.code === 121 && error?.errInfo?.details?.schemaRulesNotSatisfied) {
        const rules = error.errInfo.details.schemaRulesNotSatisfied;
        
        rules.forEach(rule => {
            if (rule.propertiesNotSatisfied) {
                rule.propertiesNotSatisfied.forEach(prop => {
                    let msgerror;
                    
                    if(prop.details[0]?.consideredValue == null){
                      msgerror = "Missing required data on field " + prop.propertyName
                    } else {
                      msgerror = prop.details[0]?.reason == "type did not match on field " + prop.propertyName ? "Invalid data type on field " + prop.propertyName : prop.details[0]?.reason
                    }

                    errorResponse.errors.push({
                        reason: msgerror,
                    });
                });
            }

            if (rule.missingProperties) {
                rule.missingProperties.forEach(prop => {
                    errorResponse.errors.push({
                        reason: "Missing required data on field " + prop,
                    });
                });
            }
        });
    }
  
    return errorResponse;
}

