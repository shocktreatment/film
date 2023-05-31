import {
  getDatabase,
  ref,
  push,
  query,
  equalTo,
  get,
  orderByChild,
} from 'firebase/database';
import { Notify } from 'notiflix';

async function writeWatched(userId, film) {
  const db = getDatabase();
  push(ref(db, 'watched/'), {
    userId: userId,
    film: film,
  })
    .then(push => {
      Notify.info('Film add watched list');
    })
    .catch(error => {
      Notify.failure('OOPS');
    });
}

async function writeQueue(userId, film) {
  const db = getDatabase();
  push(ref(db, 'queue/'), {
    userId: userId,
    film: film,
  })
    .then(push => {
      Notify.info('Film add Queue list');
    })
    .catch(error => {
      Notify.failure('OOPS');
    });
}

async function getWatchedByUserId(userId) {
  const db = getDatabase();
  const recentPostsRef = await get(
    query(ref(db, 'watched/'), orderByChild('userId'), equalTo(userId))
  );
  return recentPostsRef.val();
}

async function getQueueByUserId(userId) {
  const db = getDatabase();
  const recentPostsRef = await get(
    query(ref(db, 'queue/'), orderByChild('userId'), equalTo(userId))
  );
  return recentPostsRef.val();
}
export { writeWatched, writeQueue, getQueueByUserId, getWatchedByUserId };
