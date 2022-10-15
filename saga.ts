import { take, fork, all, put, call, delay, race } from 'redux-saga/effects'
import axios from 'axios'
import { LinearBackOff, BaseBackOff } from '@nixjs23n6/grpc-socket-core'
import * as pollSlice from 'redux/slice'

/**
 * Saga worker.
 */
function* pollSaga(backOff: BaseBackOff) {
    while (true) {
        try {
            const time = backOff.next()
            if (time === 8000) {
                backOff.reset()
            }
            console.log('Loop in', time)
            const { data } = yield call(() => axios({ url: 'https://random-data-api.com/api/app/random_app' }))
            yield put(pollSlice.onPollSuccess(data))
            yield delay(time)
        } catch (err) {
            yield put(pollSlice.onPollFailure(err))
        }
    }
}

/**
 * Saga watcher.
 */
function* watchPollSaga() {
    while (true) {
        console.log('watching', 'POLL_START')
        yield take(paymentSlice.onPollStart)
        console.log('race', 'POLL_STOP')
        const backOff = new LinearBackOff(0, 2000, 8000)
        yield race({
            //4. Start the polling worker
            task: call(pollSaga, backOff),
            //5. Start a take effect waiting for the cancel action.
            cancel: take(pollSlice.onPollStop)
        })
    }
}

export function* root() {
    yield all([
        fork(watchPollSaga)
    ])
}
