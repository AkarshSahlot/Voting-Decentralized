import { ActionGetResponse, ActionPostRequest, createPostResponse } from "@solana/actions";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Voting } from "@/../anchor/target/types/voting";
import { BN, Program } from "@coral-xyz/anchor";

const IDL = require('@/../anchor/target/idl/voting.json');

// Define CORS headers here, you'll use them multiple times
const ACTIONS_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://dial.to",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Private-Network": "true", // Allow private network access
};

export const OPTIONS = async (request: Request) => {
  // Respond to OPTIONS requests directly with CORS headers
  return new Response(null, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export async function GET(request: Request) {
  const actionMetadata: ActionGetResponse = {
    icon: "https://www.greendna.in/cdn/shop/products/peanut-butter4_600x.jpg?v=1679912833",
    title: "Vote for your favorite type of peanut butter",
    description: "Vote between crunchy and smooth peanut butter",
    label: "Vote",
    links: {
      actions: [
        {
          label: "Vote for crunchy",
          href: "/api/vote/candidate=crunchy",
          type: "transaction", // Added the required type property
        },
        {
          label: "Vote for smooth",
          href: "/api/vote/candidate=smooth",
          type: "transaction", // Added the required type property
        },
      ],
    },
  };
  return Response.json(actionMetadata, { headers: ACTIONS_CORS_HEADERS });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const candidate = url.searchParams.get("candidate");

  if (candidate !== "crunchy" && candidate !== "smooth") {
    return new Response("Invalid candidate", {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }

  const connection = new Connection("http://127.0.0.1:8899", "confirmed");
  const program: Program<Voting> = new Program(IDL, { connection });

  const body: ActionPostRequest = await request.json();

  let voter: PublicKey;
  try {
    voter = new PublicKey(body.account);
  } catch (error) {
    return new Response("Invalid account", {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }

  const instruction = await program.methods
    .vote(candidate, new BN(1))
    .accounts({
      signer: voter,
    })
    .instruction();

  const blockhash = await connection.getLatestBlockhash();

  const transaction = new Transaction({
    feePayer: voter,
    blockhash: blockhash.blockhash,
    lastValidBlockHeight: blockhash.lastValidBlockHeight,
  }).add(instruction);

  const response = await createPostResponse({
    fields: {
      type: "transaction",
      transaction: transaction,
    },
  });

  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}