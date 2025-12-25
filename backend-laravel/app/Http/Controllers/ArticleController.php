<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * GET /api/articles
     * Return all articles (latest first)
     */
    public function index()
    {
        return response()->json(
            Article::latest()->get()
        );
    }

    /**
     * GET /api/articles/latest
     * Return the latest article
     */
    public function latest()
    {
        $article = Article::latest()->first();

        if (!$article) {
            return response()->json([
                'message' => 'No articles found'
            ], 404);
        }

        return response()->json($article);
    }

    /**
     * POST /api/articles
     * Store article (used by Node worker)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'      => 'required|string',
            'content'    => 'required|string',
            'is_updated' => 'required|boolean',
            'source_url' => 'nullable|string'
        ]);

        $article = Article::create($validated);

        return response()->json($article, 201);
    }

    /**
     * GET /api/articles/{id}
     */
    public function show($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'message' => 'Article not found'
            ], 404);
        }

        return response()->json($article);
    }

    /**
     * PUT /api/articles/{id}
     */
    public function update(Request $request, $id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'message' => 'Article not found'
            ], 404);
        }

        $article->update(
            $request->only(['title','content','is_updated','source_url'])
        );

        return response()->json($article);
    }

    /**
     * DELETE /api/articles/{id}
     */
    public function destroy($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'message' => 'Article not found'
            ], 404);
        }

        $article->delete();

        return response()->json([
            'message' => 'Article deleted successfully'
        ]);
    }
}
