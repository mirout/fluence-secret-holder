import sinon from 'sinon';
import { WorkerClient, WorkerGroup } from '../../src/worker/worker.js';
import { Worker, workerMapperToMarine } from '../../src/worker/types.js';
import { expect } from 'chai';
import { WorkerAquaWrapper } from '../../src/worker/aqua_wrapper.js';
import { ClientPeer } from '@fluencelabs/js-client';

const WORKER_1 = {
  hostId: 'host1',
  workerId: 'worker1',
  patId: 'pat1',
};

const WORKER_2 = {
  hostId: 'host2',
  workerId: 'worker2',
  patId: 'pat2',
};

const WORKER_3 = {
  hostId: 'host3',
  workerId: 'worker3',
  patId: 'pat3',
};

describe('WorkerGroup', () => {
  function createWorkerGroup(): [WorkerGroup, WorkerClient] {
    const workerClient = sinon.createStubInstance(WorkerClient);
    const workers = new Map<string, Worker>([
      [WORKER_1.workerId, WORKER_1],
      [WORKER_2.workerId, WORKER_2],
      [WORKER_3.workerId, WORKER_3],
    ]);
    const workerGroup = new WorkerGroup(workers, workerClient);
    return [workerGroup, workerClient];
  }

  it('removeWorkers', async () => {
    const [workerGroup, _] = createWorkerGroup();
    const workerId = WORKER_1.workerId;
    const newGroup = workerGroup.removeWorkers([{ id: workerId }]);
    expect(newGroup.workers.has(workerId)).to.be.false;
  });
});

describe('WorkerClient', () => {
  function createWorkerClient() {
    const fluenceClient = sinon.createStubInstance(ClientPeer);

    let aquaWrapper = <WorkerAquaWrapper>{
      resolveDealSubnet: () => {},
      getWorkerServices: () => {},
    };

    const workerClient = new WorkerClient(fluenceClient, aquaWrapper);

    return {
      workerClient,
      fluenceClient,
      aquaWrapper,
    };
  }

  it('resolveDeal', async () => {
    const { workerClient, fluenceClient, aquaWrapper } = createWorkerClient();

    const dealId = { id: 'dealId' };

    const mockedAquaWrapper = sinon.mock(aquaWrapper);

    mockedAquaWrapper
      .expects('resolveDealSubnet')
      .withArgs(fluenceClient, dealId.id)
      .once()
      .returns(
        Promise.resolve({
          value: [workerMapperToMarine(WORKER_1), workerMapperToMarine(WORKER_2)],
          error: { is_ok: true, message: '' },
        }),
      );

    const resolveDealResult = await workerClient.resolveDeal(dealId);

    expect(resolveDealResult.isOk()).to.be.true;
    expect(resolveDealResult._unsafeUnwrap().get(WORKER_1.workerId)).to.be.deep.equal(WORKER_1);
    expect(resolveDealResult._unsafeUnwrap().get(WORKER_2.workerId)).to.be.deep.equal(WORKER_2);

    mockedAquaWrapper.verify();
    mockedAquaWrapper.restore();
  });

  it('getWorkerServices', async () => {
    const { workerClient, fluenceClient, aquaWrapper } = createWorkerClient();

    const mockedAquaWrapper = sinon.mock(aquaWrapper);

    mockedAquaWrapper
      .expects('getWorkerServices')
      .withArgs(fluenceClient, [workerMapperToMarine(WORKER_1), workerMapperToMarine(WORKER_2)])
      .once()
      .returns(
        Promise.resolve([
          {
            value: {
              workerId: { id: WORKER_1.workerId },
              services: [{ serviceId: { id: 'serviceId1' }, aliases: ['service1'] }],
            },
            error: { is_ok: true, message: '' },
          },
          {
            value: {
              workerId: { id: WORKER_2.workerId },
              services: [{ serviceId: { id: 'serviceId2' }, aliases: ['service2'] }],
            },
            error: { is_ok: true, message: '' },
          },
        ]),
      );

    const workerServicesResult = await workerClient.getWorkerServices([WORKER_1, WORKER_2]);

    expect(workerServicesResult.isOk()).to.be.true;
    expect(
      workerServicesResult._unsafeUnwrap().get(WORKER_1.workerId)?.services.at(0)?.aliases,
    ).to.be.deep.equal(['service1']);
    expect(
      workerServicesResult._unsafeUnwrap().get(WORKER_2.workerId)?.services.at(0)?.aliases,
    ).to.be.deep.equal(['service2']);

    mockedAquaWrapper.verify();
    mockedAquaWrapper.restore();
  });
});
