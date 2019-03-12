import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../../services/message.service';
import {Socket} from 'ngx-socket-io';
import {UserService} from '../../services/user.service';
import _ from 'lodash';
import {CaretEvent, EmojiEvent} from 'ng2-emoji-picker';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit, OnChanges {

  receiver: string;
  sender: string;
  loggedUser: any;
  message: any;
  receiverData: any;
  messages: [];
  typingMessage;
  typing = false;
  isOnline = false;
  public eventMock;
  public eventPosMock;

  public direction =
    Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : Math.random() > 0.5 ? 'right' : 'left';
  public toggled = false;
  public content = ' ';

  private _lastCaretEvent: CaretEvent;

  constructor( private messagesService: MessageService,
               private route: ActivatedRoute,
               private usersService: UserService,
               private socket: Socket) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.receiver = params.email;
      this.getUser(this.receiver);

      this.socket.on('refreshPage', () => {
        this.getUser(this.receiver);
      });
    });
    this.loggedUser = this.usersService.getPayload();
  }

  getUser(username) {
    this.usersService.getUserByUsername(username).subscribe(user => {
      this.receiverData = user;
      this.getAllMessages(this.loggedUser.userId, user._id);
    });
  }

  getAllMessages(senderId, receiverId) {
    this.messagesService.getAll(senderId, receiverId).subscribe(data => {
      this.messages = data.messages;
    });
  }

  ngAfterViewInit(): void {
    const users = {
      user1: this.loggedUser.email,
      user2: this.receiver
    };
    this.socket.emit('join chat', users);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.users.currentValue.length > 0) {
      const result = _.indexOf(changes.users.currentValue, this.receiver);
      if (result > -1) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
    }
  }

  isTyping() {
    this.socket.emit('start_typing', {
      sender: this.loggedUser.email,
      receiver: this.receiver
    });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.loggedUser.email,
        receiver: this.receiver
      });
    }, 1500);
  }


  handleSelection(event: EmojiEvent) {
    this.content =
      this.content.slice(0, this._lastCaretEvent.caretOffset) +
      event.char +
      this.content.slice(this._lastCaretEvent.caretOffset);
    this.eventMock = JSON.stringify(event);
    this.message += this.content;
    this.toggled = !this.toggled;
    this.content = '';
  }

  handleCurrentCaret(event: CaretEvent) {
    this._lastCaretEvent = event;
    this.eventPosMock = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${
      event.textContent
      } }`;
  }


  store() {
    if (this.message) {
      this.messagesService
        .store(this.loggedUser.userId, this.receiverData._id, this.receiverData.username, this.message)
        .subscribe(() => {
          this.socket.emit('refresh', {});
          this.message = '';
        });
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
