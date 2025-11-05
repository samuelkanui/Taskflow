<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskAttachment;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AttachmentController extends Controller
{
    use AuthorizesRequests;
    /**
     * Store a newly uploaded file.
     */
    public function store(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
        ]);

        $file = $request->file('file');
        $filename = $file->getClientOriginalName();
        $path = $file->store('attachments', 'public');

        $attachment = $task->attachments()->create([
            'filename' => $filename,
            'file_path' => $path,
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
        ]);

        return back()->with('success', 'File uploaded successfully.');
    }

    /**
     * Download an attachment.
     */
    public function download(TaskAttachment $attachment)
    {
        $this->authorize('view', $attachment->task);

        return Storage::disk('public')->download($attachment->file_path, $attachment->filename);
    }

    /**
     * Delete an attachment.
     */
    public function destroy(TaskAttachment $attachment)
    {
        $this->authorize('update', $attachment->task);

        // Delete file from storage
        Storage::disk('public')->delete($attachment->file_path);

        // Delete database record
        $attachment->delete();

        return back()->with('success', 'File deleted successfully.');
    }
}
