// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Buscamos o token de login guardado nos Cookies do navegador
  const token = request.cookies.get('sys_session')?.value;

  // 2. Pegamos o caminho (URL) que o usuário está tentando acessar
  const { pathname } = request.nextUrl;

  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/menus', request.url));
  }
  // 3. CENÁRIO A: O usuário NÃO está logado e tenta acessar páginas internas protegidas
  // Ele é barrado antes mesmo de conectar no PostgreSQL e redirecionado para o Login (Home)
  if (!token && pathname.startsWith('/menus')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se passou nas checagens, permite que a navegação continue normalmente
  return NextResponse.next();
}

// 5. O CONFIG: Define EXATAMENTE o que o Middleware deve vigiar
// Isso impede que ele rode em arquivos de imagem (como a logo da AGEPEN) ou estilos, economizando processamento!
export const config = {
  matcher: [
    '/',               // Monitora a tela de Login
    '/menus/:path*' // Monitora a página de produtos e qualquer subpasta dela
  ],
};
