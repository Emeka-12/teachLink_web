import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit } from '@/lib/ratelimit';
import { edgeLog } from '@/../infra/edge-config';
import { validateBody } from '@/lib/validation';
import { SignupRequestSchema } from '@/types/api/auth.dto';
import type { AuthResponseDTO, AuthErrorDTO } from '@/types/api/auth.dto';

export const runtime = 'edge';

// ---------------------------------------------------------------------------
// POST /api/auth/signup
// ---------------------------------------------------------------------------

export async function POST(
  request: NextRequest,
): Promise<NextResponse<AuthResponseDTO | AuthErrorDTO>> {
  edgeLog('info', '/api/auth/signup', 'POST request received');
  const { addHeaders, rateLimitResponse } = withRateLimit(request, 'AUTH');
  if (rateLimitResponse) return rateLimitResponse as NextResponse;

  try {
    const result = validateBody(SignupRequestSchema, await request.json());
    if (!result.ok) return addHeaders(result.error) as NextResponse;

    const { name, email } = result.data;

    // Mock: block already-registered email
    if (email === 'existing@teachlink.com') {
      return addHeaders(NextResponse.json({ message: 'Email already registered' }, { status: 409 }));
    }

    return addHeaders(
      NextResponse.json(
        {
          message: 'Account created successfully',
          user: {
            id: Math.random().toString(36).substring(2, 9),
            name,
            email,
          },
          token: `mock-jwt-token-${Date.now()}`,
        },
        { status: 201 },
      ),
    );
  } catch (error) {
    console.error('Signup error:', error);
    return addHeaders(NextResponse.json({ message: 'Internal server error' }, { status: 500 }));
  }
}

