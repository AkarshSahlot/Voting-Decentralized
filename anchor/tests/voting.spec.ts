import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'
import {Voting} from '../target/types/voting'
import {startAnchor} from "solana-bankrun";
import { BankrunProvider } from 'anchor-bankrun';

const IDL = require('../target/idl/voting.json');

const votingAddress = new PublicKey("yVBqpzNUsUsmvbho3T6hX5aHXgiV1mt51SWmtBNTK9u")

describe('voting', () => {
  // Configure the client to use the local cluster.

  let provider;
  let context;
  let votingProgram: Program<Voting>;

  beforeAll(async ()=> {
    context = await startAnchor("",[{name : "voting", programId: votingAddress}],[])
    provider = new BankrunProvider(context);

    votingProgram = new Program<Voting>(
      IDL,
      provider
    );

  })
  

  it('Initialize Poll', async () => {
     context = await startAnchor("",[{name : "voting", programId: votingAddress}],[])
     provider = new BankrunProvider(context);

     votingProgram = new Program<Voting>(
      IDL,
      provider
    );

    await votingProgram.methods.initializePoll(
      new anchor.BN(1),
      "What is your favorite type of peanut butter?",
      new anchor.BN(0),
      new anchor.BN(1821246480)

    ).rpc();

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      votingAddress,
    )
    
    const poll = await votingProgram.account.poll.fetch(pollAddress);

    console.log(poll);

    expect(poll.pollId.toNumber()).toEqual(1);
    expect(poll.description).toEqual("What is your favorite type of peanut butter?");
    expect(poll.pollStart.toNumber()).toBeLessThan(poll.pollEnd.toNumber());
  });

  it("initialize candidate", async () => {
    await votingProgram.methods.initializeCandidates(
      "smooth",
      new anchor.BN(1)
    ).rpc();
    await votingProgram.methods.initializeCandidates(
      "crunchy",
      new anchor.BN(1)
    ).rpc();
    const [crunchyAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer,'le',8) ,Buffer.from("crunchy")],
      votingAddress
    );
    const crunchyCandidate = await votingProgram.account.candidate.fetch(crunchyAddress);
    console.log(crunchyCandidate);
    expect(crunchyCandidate.canditateVotes.toNumber()).toEqual(0);

    const [smoothAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer,'le',8) ,Buffer.from("smooth")],
      votingAddress
    );
    const smoothCandidate = await votingProgram.account.candidate.fetch(smoothAddress);
    console.log(smoothCandidate);
    expect(smoothCandidate.canditateVotes.toNumber()).toEqual(0);

  })
  it("vote", async () => {
    await votingProgram.methods.vote(
      "smooth",
      new anchor.BN(1),
    ).rpc();
    const [smoothAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer,'le',8) ,Buffer.from("crunchy")],
      votingAddress
    );
    const smoothCandidate = await votingProgram.account.candidate.fetch(smoothAddress);
    console.log(smoothCandidate);
    expect(smoothCandidate.canditateVotes.toNumber()).toEqual(0);
  })
})
