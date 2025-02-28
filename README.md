### Folder structure

The folder structure is based on a suggested NestJS folder structure, and it includes at the highest levels:

- A folder for `tests` (that can be excluded in production builds)
- `commmon` folder - for types used across the applications (only limited dependencies here)

### Approach

Given the limited time and preference for initial simplicity, I mocked API calls with JSON data instead of calling a real API, avoiding rate limits and other real-world constraints
Transactions are stored in memory (simplified).
If more time was available I might use a database here

### Testing

For a testing strategy, I would consider the following:

#### Expand unit tests. Mock up more data where it's easy to predict what is supposed to happen, and set up tests based on that. E.g. several transactions from the same user with round numbers, and expected output for the user's balance and his/her aggregated totals (total spent, total earned etc.). Also this avoids rate limits from a real Transaction API and ensures predictable results.

#### Integration Tests: verify actual service calls

#### E2E tests: e.g. "localhost:3000/aggregated/677166" and verify the data for user with that Id

#### Performance tests: make sure we can handle high request volumes, consider off the shelf solutions to benchmark API performance

#### TDD approach:

1. Write a failng test first
2. Fix a failing test
3. Refactor if needed.

### Performance considerations

To handle throughput (millions of requests per day), we need to consider:

- Not being able to process requests at real time and implement
- A caching strategy - reduce API calls by storing recent results in a cache
- A request queue / rate limit - avoid overwhelming the system by queueing operations that we expect to be heavy.

### Future improvements

- DB integration
- Async processing (background worker / bus)
- Better test coverage for edge cases / invalid data
