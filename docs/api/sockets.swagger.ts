/**
 * @swagger
 * tags:
 *  name: Sockets
 *  description: The Sockets Managing API
 */

/**
 * @swagger
 * /SEND-FORWARD-REPLY:
 *   post:
 *     summary: Handle messaging functionality, including creating chats, replying, and forwarding messages.
 *     tags:
 *       - Sockets
 *     description: This function handles message creation, chat initiation, replying, and forwarding. It also validates required fields and manages conflicting scenarios.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *                 description: The ID of the chat.
 *               media:
 *                 type: string
 *                 nullable: true
 *                 description: Media content associated with the message.
 *               content:
 *                 type: string
 *                 nullable: true
 *                 description: The text content of the message.
 *               contentType:
 *                 type: string
 *                 enum: [text, image, video, file]
 *                 description: Type of the content being sent.
 *               parentMessageId:
 *                 type: string
 *                 nullable: true
 *                 description: ID of the parent message for reply or forward.
 *               isFirstTime:
 *                 type: boolean
 *                 description: Indicates whether the chat is being initiated for the first time.
 *               chatType:
 *                 type: string
 *                 enum: [group, direct, channel]
 *                 description: Type of the chat.
 *               isReply:
 *                 type: boolean
 *                 description: Indicates if the message is a reply.
 *               isForward:
 *                 type: boolean
 *                 description: Indicates if the message is forwarded.
 *     responses:
 *       200:
 *         description: Message sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Message sent successfully
 *                 res:
 *                   type: object
 *                   properties:
 *                     messageId:
 *                       type: string
 *                       description: The ID of the sent message.
 *       400:
 *         description: Bad request due to missing or conflicting fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to send the message
 *                 error:
 *                   type: string
 *                   example: missing required Fields
 *       404:
 *         description: Parent message not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to send the message
 *                 error:
 *                   type: string
 *                   example: No message found with the provided id
 */

/**
 * @swagger
 * /EDIT_MESSAGE:
 *   patch:
 *     summary: Edits an existing message in the chat.
 *     description: Edits an existing message in the chat. It is not possible to edit forwarded messages.
 *     tags: [Sockets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messageId
 *               - content
 *             properties:
 *               messageId:
 *                 type: string
 *                 description: The unique ID of the message to be edited.
 *                 example: "5f1d7e7d2c8b961a8f56b0de"
 *               content:
 *                 type: string
 *                 description: The new content to replace the old message content.
 *                 example: "Updated message content."
 *               chatId:
 *                 type: string
 *                 description: The unique ID of the chat where the message exists.
 *                 example: "5f1d7e7d2c8b961a8f56b0ab"
 *     responses:
 *       200:
 *         description: Message edited successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message describing the result of the edit operation.
 *                   example: "Message edited successfully."
 *                 res:
 *                   type: object
 *                   description: The updated message object.
 *                   properties:
 *                     message:
 *                       type: object
 *                       description: The updated message.
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The unique ID of the message.
 *                         content:
 *                           type: string
 *                           description: The updated content of the message.
 *                         isForward:
 *                           type: boolean
 *                           description: Whether the message is forwarded.
 *                           example: false
 *                         chatId:
 *                           type: string
 *                           description: The unique ID of the chat.
 *       400:
 *         description: Invalid input or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was unsuccessful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message explaining the error.
 *                   example: "Failed to edit the message."
 *                 error:
 *                   type: string
 *                   description: Details about the error (e.g., missing fields).
 *                   example: "missing required Fields"
 *       404:
 *         description: Message not found or cannot be edited (e.g., forwarded message).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was unsuccessful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message explaining why the message could not be edited.
 *                   example: "Message not found or is a forwarded message."
 *                 error:
 *                   type: string
 *                   description: Specific error details (e.g., "no message found", "cannot edit forwarded message").
 *                   example: "cannot edit a forwarded message"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was unsuccessful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message describing the result.
 *                   example: "Internal server error."
 *                 error:
 *                   type: string
 *                   description: Details about the error.
 *                   example: "Database update failed."
 */

/**
 * @swagger
 * /DELETE_MESSAGE:
 *   delete:
 *     summary: Deletes a Message.
 *     description: Deletes a message from the chat based on the provided message ID. If the message is found, it is deleted from the chat.
 *     tags: [Sockets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messageId
 *             properties:
 *               messageId:
 *                 type: string
 *                 description: The unique ID of the message to be deleted.
 *     responses:
 *       200:
 *         description: Message deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message describing the result of the deletion.
 *                   example: "Message deleted successfully."
 *       400:
 *         description: Missing required fields or invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was unsuccessful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: An error message describing the problem.
 *                   example: "Failed to delete the message."
 *                 error:
 *                   type: string
 *                   description: Details about the error (e.g., missing fields).
 *                   example: "missing required Fields"
 *       404:
 *         description: No message found with the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was unsuccessful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message describing the result.
 *                   example: "Failed to delete the message."
 *                 error:
 *                   type: string
 *                   description: Details about the error (e.g., message not found).
 *                   example: "no message found with the provided id"
 */

/**
 * @swagger
 * /UPDATE_DRAFT:
 *   post:
 *     summary: Updates a draft message
 *     description: Updates an existing draft message with new content. The updated draft is saved and the client is notified of the update.
 *     tags: [Sockets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - draftId
 *               - content
 *               - userId
 *             properties:
 *               draftId:
 *                 type: string
 *                 description: The unique ID of the draft to be updated.
 *               content:
 *                 type: string
 *                 description: The new content of the draft.
 *               userId:
 *                 type: string
 *                 description: The unique ID of the user updating the draft.
 *     responses:
 *       200:
 *         description: Draft updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   description: A message describing the result.
 *                 res:
 *                   type: object
 *                   description: The result of the update operation, containing the updated draft details.
 *                   properties:
 *                     draftId:
 *                       type: string
 *                       description: The unique ID of the updated draft.
 *                     content:
 *                       type: string
 *                       description: The new content of the updated draft.
 *       400:
 *         description: Missing required fields or invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   description: An error message describing the problem.
 *                 error:
 *                   type: string
 *                   description: Details about the error (e.g., missing fields).
 *       404:
 *         description: No draft found with the provided ID or failed to update the draft.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   description: An error message describing the result.
 *                 error:
 *                   type: string
 *                   description: Details about the error (e.g., draft not found).
 */