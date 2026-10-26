1. Add database to store feedbacks 
2. Handle errors
3. LLM sorting goes in a task queue BullMQ, Redis --- how to do local dev? Redis cloud
4. Deploy to Azure. 
    a. Web app
    b. database
    c. LLM
    d. task queue 
    e. monitoring


email validaton - user may not enter, we may want to store invalid emails just in case they give insight into the comments or we need to try to contact the person, for example someone's email may be mistakenly entered as 'clara.jamesminneapolis.edu' which can be make a educated guess as to what the actual email is, and replace the missing  @ to contact the person if needed. The college also has lists of valid student emails to match people to. 
