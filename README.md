# IS 120 - HW 11 - ASHER RUIZ

HW 11: JavaScript API Cards

## Why is it important that we only make one API call for this page?

We can easily store the objects of the entire API call in a datatype(list/object) in one call. Doing several different calls is bad for the owner of the API as it costs them money and memory every call. Most of these APIs have allowed us the grace of using these for free, so we must be as efficient/respectful as possible.

## How does that affect you as a frontend developer and how does that affect the API developers?

This means I need to be as efficient as possible and be careful in how I treat API calls and storage tactics. This would affect API developers very similarly as well, but from their point of view. They might want to use certain protections or limitations to ensure that something like an API does not crash due to overload.

## Why is local storage useful in this scenario?

We do not want to keep calling the API, as that is bad practice in this situation. Local Storage helps us keep the data types stored where we can call them from home base easily. I think of it like this: we go to the grocery store once, but take several trips to our fridge. In this sense, our API call grabs everything we need from the API, and we store it locally and grab as needed based on our functionality.

## Can you think of other instances where it would be useful?

Honestly, this would work with any instance where we are getting a group of similar data types from a single API call. For example, I think it would be tough to simplify an API call that goes through multiples paths or uses different API's altogether. So as long as it is coming from something similar, what we did in this problem would make sense then as well.

## What would break if a user's favorites referenced an item the API no longer returns?

I believe there would be a Key Error since the favorite list tries to call the favorite items through the API object's key references. Since the key no longer exists due to the API not retrieving it, something along those lines would happen.

## How could you fix that?

Maybe before calling the referenced items, there could be a check function that simply returns True or False based on if a certain key exists.
