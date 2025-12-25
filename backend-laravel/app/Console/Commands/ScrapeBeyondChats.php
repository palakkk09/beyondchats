<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Facades\Http;
use App\Models\Article;

class ScrapeBeyondChats extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:scrape-beyond-chats';


    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrapes the last page of BeyondChats blogs and stores articles in DB';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("Starting BeyondChats scraping...");

        // Step 1: Get the last page (replace page/5 with the actual last page number)
        $url = 'https://beyondchats.com/blogs/page/5/';

        $response = Http::get($url);

        if ($response->failed()) {
            $this->error("Failed to fetch the page!");
            return 1;
        }

        $crawler = new Crawler($response->body());

        // Step 2: Loop through each article element
        $crawler->filter('article')->each(function ($node) {
            $titleNode = $node->filter('h2 a');
            $contentNode = $node->filter('p'); // Adjust if needed

            $title = $titleNode->count() ? $titleNode->text() : 'No Title';
            $content = $contentNode->count() ? $contentNode->text() : 'No Content';
            $source_url = $titleNode->count() ? $titleNode->attr('href') : null;

            // Step 3: Save to DB
            Article::create([
                'title' => $title,
                'content' => $content,
                'source_url' => $source_url,
                'is_updated' => false
            ]);

            $this->info("Saved article: " . $title);
        });

        $this->info("Scraping completed!");
    }
}
