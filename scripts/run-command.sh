# Command you want to call: Wrap, Unwrap, ClaimRewards, SetFee, SetAllowedClaimRecipients, SetClaimExecutors
COMMAND=${1}
ARGS=${*:2}
if [[ "$COMMAND" == "Wrap" ]]
then
    node dist/methods/Wrap.js $ARGS
elif [[ "$COMMAND" == "Unwrap" ]]
then
    node dist/methods/Unwrap.js $ARGS
elif [[ "$COMMAND" == "ClaimRewards" ]]
then
    node dist/methods/ClaimRewards.js $ARGS
elif [[ "$COMMAND" == "SetFee" ]]
then
    node methods/SetFee.ts $ARGS
elif [[ "$COMMAND" == "SetAllowedClaimRecipients" ]]
then
    node methods/SetAllowedClaimRecipients.ts $ARGS
elif [[ "$COMMAND" == "SetClaimExecutors" ]]
then
    node methods/SetClaimExecutors.ts $ARGS
else
  echo "Error. First argument of the call must be one of: Wrap, Unwrap, ClaimRewards, SetFee, SetAllowedClaimRecipients or SetClaimExecutors"
fi

