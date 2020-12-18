## Run Redis

`docker run -d --name my-redis -p 6379:6379 redis`

```
docker exec -it my-redis bash
redis-cli
```

## bullmq

you need to call `done()` from process then only completed event will trigger.

```js
// call done when finished
done();

// or give a error if error
done(new Error("error transcoding"));

// or pass it a result
done(null, { framerate: 29.5 /* etc... */ });
```

[Empty and clean jobs](https://github.com/OptimalBits/bull/issues/709)
